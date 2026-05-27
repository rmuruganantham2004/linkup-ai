import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineUserGroup, HiOutlineArrowRight } from 'react-icons/hi';
import { staggerContainer, staggerItem } from '../animations/variants';
import Footer from '../components/Footer';

export default function Landing() {
  const stats = [
    { value: '5,000+', label: 'Active Attendees' },
    { value: '120+', label: 'Tech Hackathons' },
    { value: '87%', label: 'Match Rate' },
    { value: '15k+', label: 'Connections Formed' },
  ];

  const testimonials = [
    {
      quote: "Found my co-founder at the Event Network Platform during the 2026 AI Bangalore Hackathon. We raised our pre-seed 2 months later.",
      author: "Alex Rivers",
      role: "CTO, PromptEngine",
      match: "98% Match"
    },
    {
      quote: "The interactive map and real-time room chat made the event feel so alive. I matched with 12 blockchain developers.",
      author: "Sarah Wu",
      role: "Founder, EtherQuest",
      match: "94% Match"
    },
    {
      quote: "Normally networking is awkward. With the swipe cards and AI recommendations, it was literally like a video game.",
      author: "David Chen",
      role: "Machine Learning Dev",
      match: "91% Match"
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0f' }}>
      {/* Background decorations - absolutely positioned, non-interfering */}
      <div style={{
        position: 'fixed', top: '-200px', right: '-200px',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.2), transparent)',
        borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'fixed', bottom: '-200px', left: '-200px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent)',
        borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0
      }} />

      {/* Header / Navbar */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Orbitron', sans-serif", fontWeight: 800, color: 'white', fontSize: '0.75rem'
            }}>L</div>
            <span style={{
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Event Network Platform</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Link to="/login" style={{
              padding: '8px 16px', fontSize: '0.875rem', color: '#d1d5db',
              textDecoration: 'none', transition: 'color 0.2s'
            }}>Log in</Link>
            <Link to="/signup" style={{
              padding: '8px 16px', borderRadius: '12px', fontSize: '0.875rem',
              fontWeight: 600, color: 'white', textDecoration: 'none',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              boxShadow: '0 4px 15px rgba(168,85,247,0.3)',
              transition: 'all 0.2s'
            }}>Join Now</Link>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: '64px' }} />

      {/* ============ HERO SECTION ============ */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '80px 24px 60px',
        maxWidth: '1280px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
      }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '780px' }}
        >
          <motion.div
            variants={staggerItem}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '4px 12px', borderRadius: '9999px',
              background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
              fontSize: '0.75rem', fontWeight: 600, color: '#a855f7'
            }}
          >
            <HiOutlineSparkles style={{ animation: 'pulse 2s infinite' }} />
            AI-POWERED CO-FOUNDER MATCHMAKING
          </motion.div>

          <motion.h1
            variants={staggerItem}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800,
              fontFamily: "'Orbitron', sans-serif", color: 'white',
              lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0
            }}
          >
            Find Your Next{' '}
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>Co-Founder</span>{' '}
            Before The Event Ends.
          </motion.h1>

          <motion.p
            variants={staggerItem}
            style={{
              fontSize: '1.15rem', color: '#9ca3af',
              maxWidth: '640px', lineHeight: 1.7, margin: 0
            }}
          >
            Discover and connect with attendees at hackathons, conferences, and startup events based on skills, interests, and real-time AI matchmaking.
          </motion.p>

          <motion.div
            variants={staggerItem}
            style={{
              display: 'flex', gap: '16px', justifyContent: 'center',
              alignItems: 'center', paddingTop: '8px', flexWrap: 'wrap'
            }}
          >
            <Link to="/signup" style={{
              padding: '16px 32px', borderRadius: '16px', fontWeight: 700,
              color: 'white', textDecoration: 'none',
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              boxShadow: '0 8px 30px rgba(168,85,247,0.3)',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.3s', fontSize: '1rem'
            }}>
              Get Started Now <HiOutlineArrowRight />
            </Link>
            <Link to="/login" style={{
              padding: '16px 32px', borderRadius: '16px', fontWeight: 700,
              color: '#06b6d4', textDecoration: 'none',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(6,182,212,0.3)',
              transition: 'all 0.3s', fontSize: '1rem'
            }}>
              Launch Demo
            </Link>
          </motion.div>
        </motion.div>

        {/* Demo Mockup Widget */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            marginTop: '64px', width: '100%', maxWidth: '900px',
            background: 'rgba(15,15,26,0.8)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px', padding: '24px', position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, #a855f7, transparent)'
          }} />
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ fontSize: '0.75rem', fontFamily: "'JetBrains Mono', monospace", color: '#06b6d4' }}>
              linkup-network-engine v1.0.0
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{
                fontSize: '1.5rem', fontWeight: 700, color: 'white',
                fontFamily: "'Orbitron', sans-serif", margin: 0
              }}>Tinder-style developer matching.</h3>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>
                Swipe right to connect, left to skip, and super-connect to send an instant AI-powered icebreaker. Simple, intuitive, and extremely fast.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#d1d5db' }}>
                  <HiOutlineLightningBolt style={{ color: '#06b6d4' }} />
                  <span>Real-time typing and active status indicators.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#d1d5db' }}>
                  <HiOutlineUserGroup style={{ color: '#a855f7' }} />
                  <span>Complementary team formation recommendations.</span>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                width: '250px', height: '280px', background: 'rgba(21,21,37,0.9)',
                borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
                padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)', position: 'relative', zIndex: 2
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 700, color: '#06b6d4',
                    padding: '2px 8px', borderRadius: '9999px', background: 'rgba(6,182,212,0.1)'
                  }}>96% MATCH</span>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%', background: '#10b981',
                    boxShadow: '0 0 8px rgba(16,185,129,0.6)'
                  }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', margin: '0 0 4px' }}>Sarah Chen</h4>
                  <p style={{ fontSize: '0.75rem', color: '#a855f7', margin: '0 0 8px' }}>AI/ML Engineer</p>
                  <p style={{ fontSize: '0.7rem', color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>
                    "Building LLM-agent architectures. Let's form an AI hackathon team."
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)',
                    padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db'
                  }}>PyTorch</span>
                  <span style={{
                    fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)',
                    padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: '#d1d5db'
                  }}>FastAPI</span>
                </div>
              </div>
              <div style={{
                position: 'absolute', width: '235px', height: '260px',
                background: '#0f0f1a', borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.04)',
                transform: 'rotate(-6deg) translateY(8px) scale(0.95)',
                opacity: 0.5, zIndex: 1
              }} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section style={{
        position: 'relative', zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(15,15,26,0.4)',
        padding: '48px 24px'
      }}>
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px', textAlign: 'center'
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                fontSize: 'clamp(2rem, 3vw, 3rem)', fontWeight: 800,
                fontFamily: "'Orbitron', sans-serif",
                background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>{stat.value}</div>
              <div style={{
                fontSize: '0.75rem', fontWeight: 600, color: '#6b7280',
                textTransform: 'uppercase', letterSpacing: '0.1em'
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ EVENTS SHOWCASE ============ */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '80px 24px',
        maxWidth: '1280px', margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif", color: 'white', margin: '0 0 12px'
          }}>Designed For Modern Tech Events</h2>
          <p style={{
            color: '#9ca3af', maxWidth: '560px', margin: '0 auto', fontSize: '1rem'
          }}>Browse ongoing events, hackathons, and technology builders summits globally.</p>
        </div>

        <div style={{
          display: 'flex', gap: '24px', overflowX: 'auto',
          paddingBottom: '16px', scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none'
        }}>
          {[
            { title: 'AI HACKATHON 2026', tag: 'Bangalore', tagColor: '#a855f7', name: 'Generative AI Hackathon', desc: 'Join 500+ builders in Bangalore for a 48h sprint building with LLMs and AI Agents.', gradient: 'linear-gradient(135deg, rgba(168,85,247,0.35), rgba(6,182,212,0.2))' },
            { title: 'WEB3 SUMMIT 2026', tag: 'Hyderabad', tagColor: '#06b6d4', name: 'Web3 & DeFi Builders', desc: 'Connect with protocol designers, smart contract devs, and web3 enthusiasts.', gradient: 'linear-gradient(135deg, rgba(6,182,212,0.35), rgba(168,85,247,0.2))' },
            { title: 'STARTUP PITCH NIGHT', tag: 'Mumbai', tagColor: '#ec4899', name: 'Co-Founder Matchmaking', desc: 'A special focused networking event for technical and non-technical founders.', gradient: 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(168,85,247,0.2))' }
          ].map((event, i) => (
            <div key={i} style={{
              width: '320px', flexShrink: 0, scrollSnapAlign: 'start',
              background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '16px',
              transition: 'border-color 0.3s'
            }}>
              <div style={{
                height: '160px', borderRadius: '12px',
                background: event.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem',
                fontWeight: 700, color: 'white'
              }}>{event.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 700, color: event.tagColor,
                  textTransform: 'uppercase', background: `${event.tagColor}15`,
                  padding: '2px 8px', borderRadius: '4px', alignSelf: 'flex-start'
                }}>{event.tag}</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', margin: 0 }}>{event.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: 0, lineHeight: 1.5 }}>{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '80px 24px',
        background: 'rgba(15,15,26,0.2)',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700,
              fontFamily: "'Orbitron', sans-serif", color: 'white', margin: 0
            }}>Success Stories</h2>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px'
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)',
                padding: '24px', borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px'
              }}>
                <p style={{ fontSize: '0.875rem', color: '#d1d5db', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h5 style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem', margin: '0 0 2px' }}>{t.author}</h5>
                    <p style={{ fontSize: '0.75rem', color: '#06b6d4', margin: 0 }}>{t.role}</p>
                  </div>
                  <span style={{
                    fontSize: '0.75rem', color: '#a855f7',
                    fontFamily: "'JetBrains Mono', monospace",
                    background: 'rgba(168,85,247,0.1)',
                    padding: '2px 8px', borderRadius: '4px'
                  }}>{t.match}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section style={{
        position: 'relative', zIndex: 1,
        padding: '96px 24px',
        maxWidth: '900px', margin: '0 auto', textAlign: 'center'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px',
          padding: '64px 48px', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: '-128px', left: '-128px',
            width: '256px', height: '256px',
            background: 'rgba(168,85,247,0.2)', borderRadius: '50%',
            filter: 'blur(60px)', pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-128px', right: '-128px',
            width: '256px', height: '256px',
            background: 'rgba(6,182,212,0.2)', borderRadius: '50%',
            filter: 'blur(60px)', pointerEvents: 'none'
          }} />

          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700,
            fontFamily: "'Orbitron', sans-serif", color: 'white',
            margin: '0 0 24px', position: 'relative', zIndex: 1
          }}>Ready to find your partner in tech?</h2>
          <p style={{
            color: '#d1d5db', fontSize: '1.1rem', margin: '0 auto 32px',
            maxWidth: '520px', lineHeight: 1.6, position: 'relative', zIndex: 1
          }}>
            Create your cyber profile, specify your expertise, and start matchmaking within seconds.
          </p>
          <Link to="/signup" style={{
            display: 'inline-flex', padding: '16px 32px', borderRadius: '16px',
            fontWeight: 700, color: 'white', textDecoration: 'none',
            background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
            boxShadow: '0 8px 30px rgba(168,85,247,0.3)',
            transition: 'all 0.3s', fontSize: '1rem',
            position: 'relative', zIndex: 1
          }}>
            Create Free Account
          </Link>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer />
    </div>
  );
}
