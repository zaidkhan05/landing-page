import { useState, useEffect, useRef } from 'react';
import { ThemeProvider, Box, Typography, Button, Stack, IconButton, Divider, AppBar, Toolbar } from '@mui/material';
import { motion } from 'framer-motion';
import { GitHub, LinkedIn, Code, Terminal, Memory } from '@mui/icons-material';
import { dastyles } from './theme';

const projects = [
  { 
    id: 1, 
    title: 'Delta Air Lines', 
    role: 'Data Engineering Intern',
    year: 'Summer 2025',
    tags: ['Python', 'SQL', 'Pandas', 'AWS Athena', 'Prophet'],
    description: 'Developed Python-based data pipelines, anomaly detection, and forecasting systems using AWS Athena, Pandas, and Prophet to automate telematics data processing and predictive maintenance across multiple Delta Air Lines hubs.',
  },
  { 
    id: 2, 
      title: 'Sustain Sync AI Engine', 
    role: 'Developer',
    year: 'Fall 2025',
    tags: ['Docker', 'Django', 'Postgres', 'Python', 'React'],
    description: 'Engineered a full-stack sustainability analytics platform with a Django-Postgres backend, REST APIs, AI forecasting services, and a React dashboard, containerized with Docker for reliable CI/CD deployment.',
    url: 'https://sustainsync.github.io/SustainSync-Website',
  },
  { 
    id: 3, 
    title: 'KSU Robotics Team', 
    role: 'Programming Lead',
    year: '2023-2024',
    tags: ['C++', 'PID', 'Git', 'Control Systems'],
    description: 'Led development of C++ control software and custom PID systems for 8 competition robots, managing Git workflows and mentoring a 13-member team that achieved a top-3 global VEXU ranking.',
    url: 'https://github.com/KSUOwlBots',
  },
  { 
    id: 4, 
    title: 'Restaurant Management System', 
    role: 'Developer',
    year: 'Spring 2025',
    tags: ['Python', 'Flask', 'Pandas', 'HTML', 'CSS'],
    description: 'Built a Flask-based restaurant management app with role-specific interfaces, REST APIs, and CSV-backed data handling, developed collaboratively in an Agile team using Python, Pandas, and HTML/CSS.',
    url: 'https://github.com/zaidkhan05/SWE-3313-SPRINT-2',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [binaryText, setBinaryText] = useState('');
  const [hexValues, setHexValues] = useState<string[]>([]);
  
  // Refs for sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

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

  // Intersection observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [heroRef, aboutRef, experienceRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const transitions = {
    type: 'spring' as const,
    stiffness: 200,
    damping: 30,
  };

  return (
    <ThemeProvider theme={dastyles}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', color: '#ffffff' }}>
        {/* Floating Navigation Bar */}
        <AppBar 
          position="sticky" 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(0, 255, 65, 0.1)',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Terminal sx={{ fontSize: '1.2rem', color: '#00ff41' }} />
              <Typography 
                sx={{ 
                  fontFamily: 'monospace', 
                  color: '#00ff41', 
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                [zaid@dev]
              </Typography>
            </Box>
            <Stack direction="row" spacing={{ xs: 2, md: 4 }}>
              {[
                { label: 'Home', ref: heroRef, id: 'hero' },
                { label: 'About', ref: aboutRef, id: 'about' },
                { label: 'Experience', ref: experienceRef, id: 'experience' },
              ].map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  sx={{
                    color: activeSection === item.id ? '#00ff41' : '#b0b0b0',
                    fontFamily: 'monospace',
                    fontSize: { xs: '0.75rem', md: '0.9rem' },
                    fontWeight: 600,
                    position: 'relative',
                    transition: 'color 0.3s',
                    '&:hover': { color: '#00ff41' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      bgcolor: '#00ff41',
                      transform: activeSection === item.id ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 0.3s',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box 
          id="hero" 
          ref={heroRef}
          sx={{ minHeight: '50vh', position: 'relative' }}
        >
          <Box
            sx={{
              minHeight: '50vh',
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
                          [zaid@dev ~]$ whoami
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
                        <Typography sx={{ color: '#00ff41', mb: 1 }}>[zaid@dev ~]$ cat ~/.profile</Typography>
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>
                          Bachelors of Science in Computer Science at Kennesaw State University with a focus in AI and Machine Learning.
                        </Typography>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: .5 }} />
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>
                          Looking to grow my skills in dev-ops and firmware development.
                        </Typography>
                        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.15)', my: .5 }} />
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>
                          Previously Data Science Intern @ Delta Air Lines (Summer 2025).
                        </Typography>
                        <Typography sx={{ color: '#00ff41', mt: 2 }}>[zaid@dev ~]$ systemctl status career</Typography>
                        <Typography sx={{ color: '#b0b0b0', pl: 2 }}>● Recent Computer Science Graduate (December 2025) from Kennesaw State University.</Typography>
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
                          onClick={() => window.open('/Zaid_Khan_Resume.pdf', '_blank')}
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
                      { label: 'STACK', icon: <Code />, items: ['Python', 'C++', 'Django', 'React'] },
                      // { label: 'DOMAIN', icon: <Terminal />, items: ['Full-Stack', 'AI/ML', 'Cloud'] },
                      { label: 'SYSTEM', icon: <Memory />, items: ['CS @ KSU', 'Graduated December 2025', 'Prev @ Delta Air Lines'] },
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

        {/* About Section */}
        <Box 
          id="about" 
          ref={aboutRef}
          sx={{ 
            minHeight: 'auto', 
            px: { xs: 3, md: 8 }, 
            py: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
          <Box sx={{ maxWidth: 1200, mx: 'auto', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
                [zaid@dev ~]$ cat ~/.config/about.md
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ mb: 8, fontSize: { xs: '3rem', md: '5rem' }, color: '#ffffff', textAlign: 'center' }}>
              ABOUT
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Box sx={{ maxWidth: 900 }}>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem', mb: 4, color: '#b0b0b0', lineHeight: 1.8, textAlign: 'center' }}>
                        I am a recent graduate of the College of Computing and Software Engineering Kennesaw State University as of December 2025
                        with my Bachelor's of Science in Computer Science. I previously interned as a Data 
                        Science Intern at Delta Air Lines during the summer of 2025, where I worked under
                        the GSE Performance and Technology team to work on data processing and usage
                        forecasting for critical ground support equipment. I am currently working on
                        growing my skills in dev-ops, app development, and firmware development.
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem', color: '#b0b0b0', lineHeight: 1.8, textAlign: 'center' }}>
                        Outside of the world of programming, I enjoy reading and learning
                        about new technology trends. I dual boot Arch-Linux on my laptop, 
                        and have been exploring the various tools and configurations it offers *and struggling with drivers and firmware*. I also enjoy going to and watching motorsports, VEX
                        Robotics competitions, and battlebots events such as NHRL, and am looking to create
                        my own melty-brain style robot in the future to grow my skills in motion control systems.
                      </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        {/* Experience Section */}
        <Box 
          id="experience" 
          ref={experienceRef}
          sx={{ 
            minHeight: 'auto', 
            px: { xs: 3, md: 8 }, 
            py: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
                [zaid@dev ~]$ ls -la ~/projects/
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ mb: 8, fontSize: { xs: '3rem', md: '5rem' }, color: '#ffffff' }}>
              EXPERIENCE / PROJECTS
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
      </Box>
    </ThemeProvider>
  );
}

export default App;

