import { useState, useEffect } from 'react';
import { ThemeProvider, Box, Typography, Button, Stack, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHub, LinkedIn, Language, Close, Code, Terminal, Memory } from '@mui/icons-material';
import { minimalistTheme } from './theme';

const projects = [
  { 
    id: 1, 
    title: 'Delta Air Lines', 
    role: 'Software Engineering Intern',
    year: '2025',
    tags: ['Python', 'AWS', 'Pandas'],
    description: 'Developed modular Python data-processing scripts using AWS Athena and Pandas, implementing automated anomaly detection and Prophet-based forecasting for GSE equipment maintenance.',
  },
  { 
    id: 2, 
    title: 'Sustain Sync AI Engine', 
    role: 'Full Stack Developer',
    year: '2025',
    tags: ['Django', 'React', 'Docker'],
    description: 'Engineered REST API with 9 endpoints for utility-bill analytics. Built AI forecasting using Prophet and RAG pipeline with FAISS retrieval. Containerized full stack with Docker.',
    url: 'https://sustainsync.github.io/SustainSync-Website',
  },
  { 
    id: 3, 
    title: 'KSU Robotics Team', 
    role: 'Programming Lead',
    year: '2023-2024',
    tags: ['C++', 'PID', 'Git'],
    description: 'Led development of C++ control software for 8 VEXU competition robots, contributing to top-3 global ranking. Designed custom PID controllers and autonomous routines.',
    url: 'https://github.com/KSUOwlBots',
  },
  { 
    id: 4, 
    title: 'TriVec Builders', 
    role: 'Web Developer',
    year: '2025',
    tags: ['HTML', 'CSS', 'JSON'],
    description: 'Developed and deployed public-facing website using GitHub and Vercel. Integrated JSON-based data files for dynamic project updates and FormSubmit contact form.',
    url: 'https://trivecbuilders.com',
  },
];

function App() {
  const [activeView, setActiveView] = useState<'home' | 'about' | 'work' | 'contact'>('home');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [binaryText, setBinaryText] = useState('');
  const [hexValues, setHexValues] = useState<string[]>([]);

  // Generate random binary text for tech aesthetic
  useEffect(() => {
    const generateBinary = () => {
      const binary = Array.from({ length: 120 }, () => Math.random() > 0.5 ? '1' : '0').join('');
      setBinaryText(binary);
    };
    generateBinary();
    const interval = setInterval(generateBinary, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate hex values for status display
  useEffect(() => {
    const generateHex = () => {
      const hex = Array.from({ length: 6 }, () => 
        '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
      );
      setHexValues(hex);
    };
    generateHex();
    const interval = setInterval(generateHex, 2000);
    return () => clearInterval(interval);
  }, []);

  const transitions = {
    type: 'spring' as const,
    stiffness: 200,
    damping: 30,
  };

  return (
    <ThemeProvider theme={minimalistTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', color: '#ffffff' }}>
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions}
            >
              <Box sx={{ minHeight: '100vh', position: 'relative' }}>
                {/* Hero Section - Split Screen Design */}
                <Box
                  sx={{
                    minHeight: '100vh',
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 0,
                  }}
                >
                  {/* Left Panel - Info */}
                  <Box
                    sx={{
                      bgcolor: '#0a0a0a',
                      color: '#ffffff',
                      p: { xs: 4, md: 8 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                          linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    {/* Binary Background Text */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        left: 0,
                        right: 0,
                        fontSize: '0.7rem',
                        fontFamily: 'monospace',
                        color: 'rgba(0, 255, 65, 0.1)',
                        letterSpacing: '2px',
                        wordWrap: 'break-word',
                        px: 2,
                        transition: 'opacity 0.5s',
                      }}
                    >
                      {binaryText}
                    </Box>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, ...transitions }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                        <Terminal sx={{ fontSize: '1rem', color: '#00ff41' }} />
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            fontFamily: 'monospace',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            color: '#00ff41',
                          }}
                        >
                          {'>'} SOFTWARE_DEVELOPER.EXE
                        </Typography>
                      </Box>
                    </motion.div>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, ...transitions }}
                    >
                      <Typography 
                        variant="h1" 
                        sx={{ 
                          mb: 4, 
                          fontSize: { xs: '4rem', md: '6rem' },
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          position: 'relative',
                          '&::after': {
                            content: '"_"',
                            animation: 'blink 1s infinite',
                            '@keyframes blink': {
                              '0%, 49%': { opacity: 1 },
                              '50%, 100%': { opacity: 0 },
                            },
                          },
                        }}
                      >
                        ZAID
                        <br />
                        KHAN
                      </Typography>
                    </motion.div>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, ...transitions }}
                    >
                      <Box sx={{ mb: 6, fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: 1.8 }}>
                        <Typography sx={{ color: '#00ff41', mb: 1 }}>$ cat profile.txt</Typography>
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>
                          Computer Science student at Kennesaw State University.
                        </Typography>
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>
                          Previously Software Engineering Intern @ Delta Air Lines (Summer 2025).
                        </Typography>
                        <Typography sx={{ color: '#00ff41', mt: 2 }}>$ echo $STATUS</Typography>
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>GRADUATING_DEC_2025</Typography>
                      </Box>
                    </motion.div>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, ...transitions }}
                    >
                      <Stack direction="row" spacing={2} sx={{ mb: 6, flexWrap: 'wrap', gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => setActiveView('about')}
                          sx={{
                            borderColor: '#00ff41',
                            color: '#00ff41',
                            px: 4,
                            py: 1.5,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            border: '2px solid #00ff41',
                            '&:hover': { 
                              bgcolor: '#00ff41', 
                              color: '#0a0a0a',
                              boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                            },
                          }}
                        >
                          ./about
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setActiveView('work')}
                          sx={{
                            borderColor: '#00ff41',
                            color: '#00ff41',
                            px: 4,
                            py: 1.5,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            border: '2px solid #00ff41',
                            '&:hover': { 
                              bgcolor: '#00ff41', 
                              color: '#0a0a0a',
                              boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                            },
                          }}
                        >
                          ./projects
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => window.open('/resume.pdf', '_blank')}
                          sx={{
                            borderColor: '#00ff41',
                            color: '#00ff41',
                            px: 4,
                            py: 1.5,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            border: '2px solid #00ff41',
                            '&:hover': { 
                              bgcolor: '#00ff41', 
                              color: '#0a0a0a',
                              boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
                            },
                          }}
                        >
                          ./resume
                        </Button>
                      </Stack>
                    </motion.div>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, ...transitions }}
                    >
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        {[
                          { icon: <GitHub />, url: 'https://github.com/zaidkhan05' },
                          { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/zaid-khan-cs/' },
                        ].map((link, idx) => (
                          <IconButton
                            key={idx}
                            component="a"
                            href={link.url}
                            target="_blank"
                            sx={{
                              color: '#ffffff',
                              border: '1px solid rgba(255,255,255,0.2)',
                              '&:hover': {
                                bgcolor: '#ff4757',
                                borderColor: '#ff4757',
                              },
                            }}
                          >
                            {link.icon}
                          </IconButton>
                        ))}
                      </Box>
                    </motion.div>
                  </Box>

                  {/* Right Panel - Visual */}
                  <Box
                    sx={{
                      bgcolor: '#0d0d0d',
                      p: { xs: 4, md: 8 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: 3,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `
                          linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                        pointerEvents: 'none',
                      },
                    }}
                  >
                    {/* Hex Status Display */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        color: 'rgba(0, 255, 65, 0.3)',
                      }}
                    >
                      {hexValues.map((hex, i) => (
                        <Box key={i} sx={{ transition: 'opacity 0.3s' }}>{hex}</Box>
                      ))}
                    </Box>

                    {[
                      { label: 'STACK', icon: <Code />, items: ['Python', 'Django', 'React'] },
                      // { label: 'DOMAIN', icon: <Terminal />, items: ['Full-Stack', 'AI/ML', 'Cloud'] },
                      { label: 'SYSTEM', icon: <Memory />, items: ['CS @ KSU', 'Graduating Dec 2025', 'Prev @ Delta Air Lines'] },
                    ].map((section, idx) => (
                      <motion.div
                        key={section.label}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + idx * 0.1, ...transitions }}
                      >
                        <Box
                          sx={{
                            p: 4,
                            bgcolor: '#0a0a0a',
                            border: '2px solid rgba(0, 255, 65, 0.2)',
                            transition: 'all 0.3s',
                            position: 'relative',
                            '&:hover': {
                              transform: 'translateX(-12px)',
                              borderColor: '#00ff41',
                              boxShadow: '6px 0 0 #00ff41, 0 0 30px rgba(0, 255, 65, 0.2)',
                              bgcolor: 'rgba(0, 255, 65, 0.05)',
                            },
                            '&::before': {
                              content: `"${String(idx + 1).padStart(2, '0')}"`,
                              position: 'absolute',
                              top: 8,
                              right: 12,
                              fontSize: '0.7rem',
                              fontFamily: 'monospace',
                              color: 'rgba(0, 255, 65, 0.3)',
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                            <Box sx={{ color: '#00ff41', display: 'flex' }}>
                              {section.icon}
                            </Box>
                            <Typography
                              sx={{
                                fontSize: '0.75rem',
                                fontFamily: 'monospace',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                color: '#00ff41',
                              }}
                            >
                              [{section.label}]
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                            {section.items.map((item) => (
                              <Typography
                                key={item}
                                sx={{
                                  fontSize: '1rem',
                                  fontFamily: 'monospace',
                                  fontWeight: 600,
                                  color: '#ffffff',
                                  '&::before': {
                                    content: '"» "',
                                    color: '#00ff41',
                                  },
                                }}
                              >
                                {item}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>


                </Box>
              </Box>
            </motion.div>
          )}

          {activeView === 'work' && (
            <motion.div
              key="work"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box sx={{ 
                minHeight: '100vh', 
                px: { xs: 3, md: 8 }, 
                py: 8,
                bgcolor: '#0a0a0a',
                color: '#ffffff',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                  pointerEvents: 'none',
                },
              }}>
                <IconButton
                  onClick={() => setActiveView('home')}
                  sx={{
                    position: 'fixed',
                    top: 40,
                    right: 40,
                    zIndex: 1000,
                    width: 60,
                    height: 60,
                    border: '2px solid #00ff41',
                    color: '#00ff41',
                    '&:hover': { 
                      bgcolor: '#00ff41', 
                      color: '#0a0a0a',
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
                    },
                  }}
                >
                  <Close />
                </IconButton>

                <Box sx={{ maxWidth: 1400, mx: 'auto', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Terminal sx={{ fontSize: '1rem', color: '#00ff41' }} />
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#00ff41',
                      }}
                    >
                      {'>'} ls -la ~/projects/
                    </Typography>
                  </Box>
                  <Typography variant="h2" sx={{ mb: 8, fontSize: { xs: '3rem', md: '5rem' }, color: '#ffffff' }}>
                    PROJECTS
                  </Typography>

                  <Stack spacing={0}>
                    {projects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        onHoverStart={() => setHoveredProject(project.id)}
                        onHoverEnd={() => setHoveredProject(null)}
                      >
                        <Box
                          component="a"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            py: 6,
                            borderBottom: '2px solid rgba(0, 255, 65, 0.1)',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            position: 'relative',
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'block',
                            '&:hover': {
                              pl: 4,
                              borderBottomColor: 'rgba(0, 255, 65, 0.3)',
                              bgcolor: 'rgba(0, 255, 65, 0.02)',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              position: 'absolute',
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: hoveredProject === project.id ? 6 : 0,
                              bgcolor: '#00ff41',
                              boxShadow: hoveredProject === project.id ? '0 0 20px rgba(0, 255, 65, 0.5)' : 'none',
                              transition: 'width 0.3s',
                            }}
                          />

                          <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent="space-between"
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                            spacing={2}
                          >
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                sx={{
                                  fontSize: '0.75rem',
                                  fontFamily: 'monospace',
                                  letterSpacing: '0.2em',
                                  mb: 1,
                                  color: '#00ff41',
                                  fontWeight: 700,
                                }}
                              >
                                [{project.year}] • {project.role}
                              </Typography>
                              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' }, color: '#ffffff' }}>
                                {project.title}
                              </Typography>
                              <Typography
                                sx={{
                                  maxWidth: 600,
                                  color: '#b0b0b0',
                                  mb: 2,
                                  fontFamily: 'monospace',
                                }}
                              >
                                {project.description}
                              </Typography>
                              <Stack direction="row" spacing={1} flexWrap="wrap">
                                {project.tags.map((tag) => (
                                  <Box
                                    key={tag}
                                    sx={{
                                      px: 2,
                                      py: 0.5,
                                      bgcolor: hoveredProject === project.id ? '#00ff41' : 'rgba(0, 255, 65, 0.1)',
                                      color: hoveredProject === project.id ? '#0a0a0a' : '#00ff41',
                                      fontSize: '0.75rem',
                                      fontFamily: 'monospace',
                                      fontWeight: 700,
                                      letterSpacing: '0.1em',
                                      border: `1px solid ${hoveredProject === project.id ? '#00ff41' : 'rgba(0, 255, 65, 0.3)'}`,
                                      transition: 'all 0.3s',
                                    }}
                                  >
                                    {tag}
                                  </Box>
                                ))}
                              </Stack>
                            </Box>
                          </Stack>
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </motion.div>
          )}

          {activeView === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box sx={{ 
                minHeight: '100vh', 
                px: { xs: 3, md: 8 }, 
                py: 8,
                bgcolor: '#0a0a0a',
                color: '#ffffff',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `
                    linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                  pointerEvents: 'none',
                },
              }}>
                <IconButton
                  onClick={() => setActiveView('home')}
                  sx={{
                    position: 'fixed',
                    top: 40,
                    right: 40,
                    zIndex: 1000,
                    width: 60,
                    height: 60,
                    border: '2px solid #00ff41',
                    color: '#00ff41',
                    '&:hover': { 
                      bgcolor: '#00ff41', 
                      color: '#0a0a0a',
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
                    },
                  }}
                >
                  <Close />
                </IconButton>

                <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 8 }}>
                    <Code sx={{ fontSize: '1rem', color: '#00ff41' }} />
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#00ff41',
                      }}
                    >
                      {'>'} cat ~/about.txt
                    </Typography>
                  </Box>
                  <Typography variant="h2" sx={{ mb: 8, fontSize: { xs: '3rem', md: '5rem' }, color: '#ffffff' }}>
                    ABOUT
                  </Typography>

                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
                      gap: 8,
                    }}
                  >
                    <Box>
                      <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem', mb: 4, color: '#b0b0b0', lineHeight: 1.8 }}>
                        Computer Science student at Kennesaw State University graduating December 2025.
                        Software Engineering Intern at Delta Air Lines (Summer 2025), where I developed
                        Python data pipelines, automated anomaly detection systems, and built Prophet-based
                        forecasting models for GSE equipment maintenance.
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem', color: '#b0b0b0', lineHeight: 1.8 }}>
                        Experienced in full-stack development, AI/ML engineering, and robotics. Led programming
                        for KSU's robotics team (top-3 global ranking) and developed production web applications.
                        Passionate about building scalable systems and solving complex technical problems.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          mb: 3,
                          fontWeight: 700,
                          color: '#00ff41',
                        }}
                      >
                        [TECH_STACK]
                      </Typography>
                      <Stack spacing={2}>
                        {['Python', 'C++', 'Django', 'Flask', 'React', 'Pandas', 'Postgres', 'Docker', 'Git'].map((skill) => (
                          <Typography 
                            key={skill} 
                            sx={{ 
                              fontSize: '1.5rem', 
                              fontWeight: 700,
                              fontFamily: 'monospace',
                              color: '#ffffff',
                              '&::before': {
                                content: '"» "',
                                color: '#00ff41',
                              },
                            }}
                          >
                            {skill}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )}

          {activeView === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                sx={{
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  px: { xs: 3, md: 8 },
                  bgcolor: '#0a0a0a',
                  color: '#ffffff',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                      linear-gradient(rgba(0, 255, 65, 0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 65, 0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                    pointerEvents: 'none',
                  },
                }}
              >
                <IconButton
                  onClick={() => setActiveView('home')}
                  sx={{
                    position: 'fixed',
                    top: 40,
                    right: 40,
                    zIndex: 1000,
                    width: 60,
                    height: 60,
                    border: '2px solid #00ff41',
                    color: '#00ff41',
                    '&:hover': { 
                      bgcolor: '#00ff41', 
                      color: '#0a0a0a',
                      boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
                    },
                  }}
                >
                  <Close />
                </IconButton>

                <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6, justifyContent: 'center' }}>
                    <Terminal sx={{ fontSize: '1rem', color: '#00ff41' }} />
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        color: '#00ff41',
                      }}
                    >
                      {'>'} init contact_protocol
                    </Typography>
                  </Box>
                  <Typography variant="h2" sx={{ mb: 6, fontSize: { xs: '3rem', md: '5rem' }, color: '#ffffff' }}>
                    LET'S
                    <br />
                    CONNECT
                  </Typography>

                  <Stack direction="row" spacing={4} justifyContent="center">
                    {[
                      { icon: <GitHub />, label: 'GitHub', url: 'https://github.com/zaidkhan05' },
                      { icon: <LinkedIn />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/zaid-khan-cs/' },
                      { icon: <Language />, label: 'Website', url: 'https://www.faicon.me/' },
                    ].map((link) => (
                      <motion.div key={link.label} whileHover={{ y: -10 }}>
                        <IconButton
                          component="a"
                          href={link.url}
                          target="_blank"
                          sx={{
                            width: 80,
                            height: 80,
                            border: '2px solid #00ff41',
                            color: '#00ff41',
                            '&:hover': { 
                              bgcolor: '#00ff41', 
                              color: '#0a0a0a',
                              boxShadow: '0 0 30px rgba(0, 255, 65, 0.5)',
                            },
                          }}
                        >
                          {link.icon}
                        </IconButton>
                      </motion.div>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
}

export default App;

