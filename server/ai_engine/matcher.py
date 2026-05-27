import math
from typing import List, Dict, Any

# Pure Python Cosine Similarity fallback in case NumPy/Scikit-learn compilation fails
def tokenize_and_vectorize(text_list: List[str]) -> List[Dict[str, float]]:
    """
    Computes TF-IDF vector representations in pure Python
    """
    # 1. Compute term frequencies (TF) and doc frequencies (DF)
    doc_freq = {}
    tfs = []
    
    for text in text_list:
        words = [w.lower().strip() for w in text.split(",") if w.strip()]
        tf = {}
        for w in words:
            tf[w] = tf.get(w, 0.0) + 1.0
        
        # Normalize tf
        total_words = sum(tf.values())
        for w in tf:
            tf[w] = tf[w] / (total_words if total_words > 0 else 1.0)
            
        tfs.append(tf)
        
        # Unique words in document
        for w in set(words):
            doc_freq[w] = doc_freq.get(w, 0.0) + 1.0
            
    # 2. Compute IDF
    num_docs = len(text_list)
    idfs = {}
    for word, df in doc_freq.items():
        idfs[word] = math.log((1.0 + num_docs) / (1.0 + df)) + 1.0
        
    # 3. Compute TF-IDF Vectors
    vectors = []
    for tf in tfs:
        vec = {}
        for word, val in tf.items():
            vec[word] = val * idfs[word]
        vectors.append(vec)
        
    return vectors

def compute_cosine_similarity(vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
    """
    Computes cosine similarity between two dict-based vectors
    """
    all_keys = set(vec1.keys()).union(set(vec2.keys()))
    dot_product = 0.0
    for k in all_keys:
        dot_product += vec1.get(k, 0.0) * vec2.get(k, 0.0)
        
    norm1 = math.sqrt(sum(v**2 for v in vec1.values()))
    norm2 = math.sqrt(sum(v**2 for v in vec2.values()))
    
    if norm1 == 0.0 or norm2 == 0.0:
        return 0.0
        
    return dot_product / (norm1 * norm2)

def generate_recommendations(user: Any, all_users: List[Any]) -> List[Dict[str, Any]]:
    """
    Generates customized matches based on skills and interests overlap
    """
    recommendations = []
    
    user_skills = user.skills or ""
    user_interests = user.interests or ""
    user_profile_text = f"{user_skills},{user_interests}"
    
    for other in all_users:
        if other.id == user.id:
            continue
            
        other_skills = other.skills or ""
        other_interests = other.interests or ""
        other_profile_text = f"{other_skills},{other_interests}"
        
        # Build document corpus for vectorizer
        corpus = [user_profile_text, other_profile_text]
        vectors = tokenize_and_vectorize(corpus)
        
        # Cosine similarity metric
        similarity = compute_cosine_similarity(vectors[0], vectors[1])
        match_score = int(similarity * 100)
        
        # Boost matches slightly to avoid full 0s if they share at least one tag
        shared_skills = set([s.lower().strip() for s in user_skills.split(",") if s.strip()]).intersection(
            set([s.lower().strip() for s in other_skills.split(",") if s.strip()])
        )
        shared_interests = set([i.lower().strip() for i in user_interests.split(",") if i.strip()]).intersection(
            set([i.lower().strip() for i in other_interests.split(",") if i.strip()])
        )
        
        if shared_skills or shared_interests:
            match_score = max(match_score, 50 + len(shared_skills)*10 + len(shared_interests)*5)
            
        match_score = min(match_score, 99)
        
        # Determine natural reason description
        reason = "Complementary skillsets & matched profile traits."
        if shared_skills:
            reason = f"You both share interest or knowledge in {', '.join(list(shared_skills)[:2])}."
        elif shared_interests:
            reason = f"Matched goals based on interest in {list(shared_interests)[0]}."
            
        recommendations.append({
            "id": other.id,
            "name": other.name,
            "role": other.role,
            "bio": other.bio,
            "skills": [s.strip() for s in other_skills.split(",") if s.strip()],
            "interests": [i.strip() for i in other_interests.split(",") if i.strip()],
            "github": other.github,
            "linkedin": other.linkedin,
            "matchScore": match_score,
            "matchReason": reason,
            "isOnline": other.is_online,
            "location": {"lat": other.lat, "lng": other.lng} if other.lat else None
        })
        
    # Sort recommendations descending by matchScore
    recommendations.sort(key=lambda x: x["matchScore"], reverse=True)
    return recommendations
