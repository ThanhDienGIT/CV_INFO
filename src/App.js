/* ===================================================================
 * --- PHẦN 1: IMPORT CÁC THƯ VIỆN VÀ COMPONENT CẦN THIẾT ---
 * ===================================================================
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Layout, Row, Col, Typography, Space, Divider, Timeline,
  ConfigProvider, Card, Tag, Menu, Avatar, Form, Input, Button,
  message, Rate, Progress,
} from 'antd';
import {
  CalendarOutlined, HomeOutlined, PhoneOutlined, GithubOutlined,
  UserOutlined, AppstoreOutlined, MailOutlined, FacebookOutlined,
  TwitterOutlined, YoutubeOutlined, InstagramOutlined, DotChartOutlined, 
  ExperimentOutlined, CodeOutlined, MenuOutlined, ProjectOutlined,
} from '@ant-design/icons';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

/* ===================================================================
 * --- PHẦN 2: KHAI BÁO CÁC COMPONENT, BIẾN VÀ DỮ LIỆU TOÀN CỤC ---
 * ===================================================================
 */
const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// Bảng màu mới dựa trên hình ảnh bạn cung cấp
const newThemeColors = {
  primary: '#034C5F', // Xanh đậm cho text và các yếu tố chính
  accent: '#EE6457',  // Cam/Đỏ cho nút bấm và các điểm nhấn
  secondary: '#97BEC6',// Xanh nhạt cho các yếu tố phụ
  background: '#FDF5F4', // Màu nền trắng hồng
  cardBackground: '#FFFFFF',
};

// Dữ liệu CV
const cvData = {
  name: 'Nguyễn Trần Thanh Điền',
  title: 'Developer & Product Manager',
  avatar: `https://placehold.co/400x400/${newThemeColors.primary.substring(1)}/FFFFFF?text=TĐ`, 
  contact: { dob: '13/06/2000', address: '', phone: '+84 966 631 453', email: 'thanhdiensett@gmail.com', github: 'ThanhDienGIT' },
  introduction: 'Với nhiều năm kinh nghiệm trong lĩnh vực công nghệ thông tin, tôi đã làm việc trong nhiều vai trò khác nhau từ lập trình viên đến quản lý sản phẩm. Tôi đam mê công nghệ và luôn tìm kiếm cơ hội để học hỏi và phát triển bản thân. Tôi có khả năng làm việc nhóm tốt và luôn sẵn sàng hỗ trợ đồng nghiệp.',
  skills: ['JavaScript, TypeScript, PHP', 'ReactJS, NodeJS, Laravel, NestJS, NextJS', 'MySQL, MongoDB, PostgreSQL, oracle', 'Git, GitHub, GitLab', 'Phân tích và giải quyết vấn đề', 'Giao tiếp và làm việc nhóm'],
  certificates: [{ name: 'AWS Cloud Technical & Practitioner Essentials', date: '29/12/2023' }, { name: 'Quản trị mạng Cisco cơ bản - CCNA', date: '29/12/2023' }],
  experience: [{ role: 'DEVELOPER', company: 'VHEC', period: '2023', responsibilities: ['Dev', 'Phát triển và bảo trì các ứng dụng web'] }, { role: 'DEVELOPER', company: 'VNPT', period: '2023 - Hiện tại', responsibilities: ['Dev', 'Project Manager', 'Support kỹ thuật cho khách hàng.', 'Phát triển và bảo trì các ứng dụng web và di động.'] }],
  education: [{ degree: 'KỸ SƯ KỸ THUẬT PHẦN MỀM', university: 'ĐẠI HỌC CẦN THƠ', period: '2018 - 2022' }],
};

// Dữ liệu sản phẩm
const affiliateProducts = [
    { id: 1, name: '[6.6-VC ĐẾN 20%] Thùng 24 Lon Nước Tăng Lực Sting Vàng', image: 'https://placehold.co/600x600/ffc107/000000?text=Sting+Gold', price: '226.000₫', sold: '2k', tags: ['Mall', '10% Giảm'], link: '#', discountPercentage: '-6%', shopName: 'Suntory Pepsico' },
    { id: 2, name: 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', image: 'https://placehold.co/600x600/333333/FFFFFF?text=Laptop+Gaming', price: '19.990.000₫', sold: '560', tags: ['Mall', 'Trả góp 0%'], link: '#', discountPercentage: '-20%', extraInfo: 'Hàng quốc tế' },
];

// Dữ liệu kỹ năng lật
const flippableSkillsData = [
    { name: 'React', icon: `https://placehold.co/100x100/${newThemeColors.secondary.substring(1)}/FFFFFF?text=React`, description: 'Next.js, Tailwind, MUI, SEO, HTML/CSS, Shadon-ui, Dark-mode, multi language.', rating: 5 },
    { name: 'Node.js', icon: `https://placehold.co/100x100/${newThemeColors.secondary.substring(1)}/FFFFFF?text=Node`, description: 'Nest.js, Socket, API, Crawl Data, Authenticate, Swagger, Schedule.', rating: 4 },
];

// Dữ liệu cho trang dự án với cấu trúc mới, chi tiết hơn.
const projectsData = [
  { title: 'Ứng dụng Y tế cho Sở Y Tế', category: 'UI/UX & Mobile App', description: 'Thiết kế và phát triển ứng dụng chăm sóc sức khỏe cho Sở Y tế Hậu Giang, tập trung vào giao diện thân thiện cho việc đặt lịch khám và quản lý hồ sơ sức khỏe điện tử.', image: 'https://cdn.dribbble.com/userupload/4060943/file/original-2780b6419448a3df5739c14833633214.png?resize=1200x900', startDate: '01/2023', endDate: '06/2023', status: 'Đã triển khai', statusPercent: 100, tags: { design: ['Figma', 'UI/UX Research'], frontend: ['Flutter'], backend: ['Node.js', 'Express'], db: ['MongoDB'], }, link: '#'},
  { title: 'Website Thương mại Điện tử', category: 'Web Application', description: 'Xây dựng một website e-commerce full-stack với các tính năng quản lý sản phẩm, giỏ hàng, thanh toán và quản lý đơn hàng. Tối ưu hóa cho SEO và trải nghiệm người dùng.', image: 'https://cdn.dribbble.com/userupload/11188200/file/original-259276973a2135c754668b3687483759.png?resize=1200x900', startDate: '07/2023', endDate: '12/2023', status: 'Đang phát triển', statusPercent: 75, tags: { design: [], frontend: ['React', 'Next.js', 'Ant Design'], backend: ['NestJS', 'GraphQL'], db: ['PostgreSQL'], }, link: '#'},
];

/* ===================================================================
 * --- PHẦN 3: ĐỊNH NGHĨA CÁC COMPONENT TRANG (PAGES) ---
 * ===================================================================
 */

const Section = ({ title, children }) => ( <div style={{ marginBottom: '28px' }}><Title level={4} style={{ borderBottom: `2px solid ${newThemeColors.primary}`, paddingBottom: '8px', marginBottom: '16px', color: newThemeColors.primary, letterSpacing: '1px' }}>{title.toUpperCase()}</Title>{children}</div>);

const CVPage = () => ( <div style={{ background: newThemeColors.cardBackground, padding: '40px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', maxWidth: '1100px', margin: 'auto' }}><Header style={{ backgroundColor: 'transparent', padding: 0, height: 'auto', textAlign: 'center', marginBottom: '24px' }}><Avatar size={128} src={cvData.avatar} style={{ border: `4px solid ${newThemeColors.primary}`, marginBottom: '20px' }} /><Title style={{ color: newThemeColors.text, marginBottom: 0, letterSpacing: '2px' }}>{cvData.name}</Title><Title level={4} style={{ color: newThemeColors.text, opacity: 0.65, marginTop: '8px' }}>{cvData.title}</Title></Header><Row gutter={[16, 16]} justify="center" style={{ textAlign: 'center', marginBottom: '32px' }}><Col xs={24} sm={12} md={6}><Space><CalendarOutlined /> <Text>{cvData.contact.dob}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><PhoneOutlined /> <Text>{cvData.contact.phone}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><MailOutlined /> <Text>{cvData.contact.email}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><GithubOutlined /> <Text>{cvData.contact.github}</Text></Space></Col></Row><Divider style={{ borderColor: 'rgba(0,0,0,0.1)' }} /><Row gutter={48}><Col xs={24} md={8}><Section title="Giới thiệu"><Paragraph>{cvData.introduction}</Paragraph></Section><Section title="Kỹ năng">{cvData.skills.map((skill, index) => <Paragraph key={index}>• {skill}</Paragraph>)}</Section><Section title="Chứng chỉ">{cvData.certificates.map((cert, index) => <div key={index}><Text strong>{cert.name}</Text> <Text type="secondary">({cert.date})</Text></div>)}</Section></Col><Col xs={24} md={16}><Section title="Kinh nghiệm làm việc"><Timeline color={newThemeColors.primary}>{cvData.experience.map((exp, index) => <Timeline.Item key={index} color={newThemeColors.primary}><Title level={5}>{exp.role}</Title><Text strong>{exp.company}</Text> | <Text type="secondary">{exp.period}</Text><ul style={{ paddingLeft: 20, marginTop: 8 }}>{exp.responsibilities.map((res, i) => <li key={i}><Paragraph style={{ margin: 0 }}>{res}</Paragraph></li>)}</ul></Timeline.Item>)}</Timeline></Section><Section title="Học vấn"><Timeline>{cvData.education.map((edu, index) => <Timeline.Item key={index} color={newThemeColors.primary}><Title level={5}>{edu.degree}</Title><Text strong>{edu.university}</Text> | <Text type="secondary">{edu.period}</Text></Timeline.Item>)}</Timeline></Section></Col></Row></div>);
const ProductsPage = () => ( <div style={{ maxWidth: '1200px', margin: 'auto' }}><Title level={2} style={{ textAlign: 'center', color: newThemeColors.primary, marginBottom: '40px' }}>Sản Phẩm Gợi Ý</Title><Row gutter={[24, 24]}>{affiliateProducts.map(product => (<Col key={product.id} xs={24} sm={12} md={8} lg={6}><a href={product.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><Card hoverable cover={<div style={{ position: 'relative' }}><img alt={product.name} src={product.image} style={{ aspectRatio: '1 / 1', objectFit: 'cover', width: '100%' }} />{product.discountPercentage && (<Tag color="red" style={{ position: 'absolute', top: 8, right: 8, fontSize: '14px', padding: '2px 8px' }}>{product.discountPercentage}</Tag>)}</div>} style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: newThemeColors.cardBackground }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}><div style={{ flex: '1 0 auto' }}><Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '8px', minHeight: '44px' }}>{product.name}</Paragraph>{product.shopName && (<Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Bán bởi: {product.shopName}</Text>)}<Space wrap size={[4, 8]} style={{ marginBottom: '8px' }}>{product.tags.map(tag => <Tag key={tag} color="geekblue">{tag}</Tag>)}{product.extraInfo && <Tag color="blue">{product.extraInfo}</Tag>}</Space></div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}><Text style={{ color: newThemeColors.accent, fontSize: '1.2em', fontWeight: 'bold' }}>{product.price}</Text><Text type="secondary">Đã bán {product.sold}</Text></div></Card></a></Col>))}</Row></div>);
const ContactPage = () => { const [form] = Form.useForm(); const onFinish = (values) => {console.log('Received values of form: ', values); message.success('Cảm ơn bạn đã liên hệ!'); form.resetFields();}; return (<div style={{ maxWidth: '800px', margin: 'auto' }}><Card title={<Title level={2} style={{ textAlign: 'center', color: newThemeColors.primary, marginBottom: 0 }}>Liên Hệ Với Tôi</Title>} bordered={false} style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}><Paragraph style={{ textAlign: 'center', marginBottom: '40px' }}>Mọi thắc mắc hoặc cơ hội hợp tác, xin vui lòng điền vào form bên dưới.</Paragraph><Form form={form} layout="vertical" onFinish={onFinish}><Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}><Input placeholder="Nguyễn Văn A" /></Form.Item><Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}><Input placeholder="example@email.com" /></Form.Item><Form.Item name="phone" label="Số điện thoại (Tùy chọn)"><Input placeholder="09xxxxxxxx" /></Form.Item><Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}><TextArea rows={5} placeholder="Nội dung bạn muốn trao đổi..." /></Form.Item><Form.Item style={{ textAlign: 'center' }}><motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Button type="primary" htmlType="submit" size="large" style={{ background: newThemeColors.accent, borderColor: newThemeColors.accent }}>Gửi liên hệ</Button></motion.div></Form.Item></Form></Card></div>);};
const ParticlesPage = () => { const canvasRef = useRef(null); useEffect(() => { const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); let animationFrameId; const parent = canvas.parentElement; canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight; let particlesArray = []; const numberOfParticles = 100; class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 5 + 1; this.speedX = Math.random() * 3 - 1.5; this.speedY = Math.random() * 3 - 1.5; } update() { if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX; if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY; this.x += this.speedX; this.y += this.speedY; } draw() { ctx.fillStyle = newThemeColors.primary; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } } function init() { particlesArray = []; for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); } } function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); particlesArray[i].draw(); } animationFrameId = requestAnimationFrame(animate); } init(); animate(); return () => { cancelAnimationFrame(animationFrameId); }; }, []); return (<div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 128px)' }}><canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}/><div style={{ position: 'relative', zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}><Title style={{ color: newThemeColors.primary }}>Hiệu Ứng Hạt Tự Triển Khai</Title><Paragraph style={{fontSize: '16px'}}>Đây là ví dụ về hiệu ứng hạt được tạo bằng HTML5 Canvas và JavaScript, không cần thư viện ngoài. Nó thể hiện khả năng làm việc với đồ họa cấp thấp trên trình duyệt.</Paragraph><Paragraph type="secondary">Toàn bộ logic nằm trong component `ParticlesPage` sử dụng `useEffect` và `useRef` của React.</Paragraph></div></div>); };
const SkillsChartPage = () => { const skillData = [ { subject: 'JavaScript', A: 90 }, { subject: 'TypeScript', A: 85 }, { subject: 'ReactJS', A: 95 }, { subject: 'NodeJS', A: 80 }, { subject: 'Database', A: 75 }, { subject: 'DevOps', A: 60 } ]; return (<div style={{ maxWidth: '1000px', margin: 'auto', textAlign: 'center' }}><Title level={2} style={{ color: newThemeColors.primary, marginBottom: '20px' }}>Bản Đồ Kỹ Năng</Title><Paragraph style={{fontSize: '16px', maxWidth: '800px', margin: '0 auto 40px auto'}}>Thay vì một danh sách tĩnh, việc trực quan hóa kỹ năng bằng biểu đồ giúp nhà tuyển dụng có cái nhìn tổng quan và nhanh chóng về năng lực của bạn.</Paragraph><Row justify="center"><Col xs={24} md={16} style={{ height: '500px' }}><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}><Tooltip contentStyle={{ backgroundColor: '#fff', border: `1px solid ${newThemeColors.primary}`}} labelStyle={{ color: newThemeColors.primary }} /><PolarGrid stroke="rgba(0,0,0,0.1)" /><PolarAngleAxis dataKey="subject" tick={{ fill: newThemeColors.text }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} /><Radar name="Thanh Điền" dataKey="A" stroke={newThemeColors.primary} fill={newThemeColors.primary} fillOpacity={0.6} /></RadarChart></ResponsiveContainer></Col></Row><Paragraph type="secondary" style={{marginTop: '20px'}}>Dữ liệu cho biểu đồ này được lấy từ mảng `skillData`. Bạn có thể dễ dàng cập nhật mức độ hoặc thêm các kỹ năng mới.</Paragraph></div>); };
const FlippableSkillsPage = () => { const flipCardStyles = ` .flip-card { background-color: transparent; width: 100%; height: 250px; perspective: 1000px; } .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d; } .flip-card:hover .flip-card-inner { transform: rotateY(180deg); } .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; border-radius: 12px; } .flip-card-front { background-color: ${newThemeColors.cardBackground}; color: ${newThemeColors.text}; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.08); } .flip-card-back { background-color: ${newThemeColors.accent}; color: white; transform: rotateY(180deg); } `; return (<div style={{ maxWidth: '1200px', margin: 'auto' }}><style>{flipCardStyles}</style><Title level={2} style={{ textAlign: 'center', color: newThemeColors.primary, marginBottom: '20px' }}>Bảng Kỹ Năng Tương Tác</Title><Paragraph style={{textAlign: 'center', fontSize: '16px', maxWidth: '800px', margin: '0 auto 40px auto'}}>Di chuột qua các thẻ để xem chi tiết và đánh giá về từng kỹ năng. Hiệu ứng lật 3D này được tạo hoàn toàn bằng CSS.</Paragraph><Row gutter={[24, 24]}>{flippableSkillsData.map(skill => (<Col key={skill.name} xs={24} sm={12} md={8} lg={6}><div className="flip-card"><div className="flip-card-inner"><div className="flip-card-front"><Avatar size={64} src={skill.icon} style={{marginBottom: '16px'}} /><Title level={4}>{skill.name}</Title><Rate disabled defaultValue={skill.rating} /></div><div className="flip-card-back"><Title level={5} style={{color: 'white'}}>{skill.name}</Title><Paragraph style={{color: 'white', flexGrow: 1}}>{skill.description}</Paragraph><Text strong style={{color: 'white'}}>Mức độ thành thạo:</Text><Rate disabled defaultValue={skill.rating} style={{'--ant-rate-star-color': 'white', '--ant-rate-star-hover-color': 'white'}}/></div></div></div></Col>))}</Row></div>); };
const Typewriter = ({ toRotate, period }) => { const [text, setText] = useState(''); const [loopNum, setLoopNum] = useState(0); const [isDeleting, setIsDeleting] = useState(false); const [delta, setDelta] = useState(200 - Math.random() * 100); useEffect(() => { let ticker = setInterval(() => { tick(); }, delta); return () => { clearInterval(ticker) }; }, [text]); const tick = () => { const i = loopNum % toRotate.length; const fullText = toRotate[i]; const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1); setText(updatedText); if (isDeleting) { setDelta(prevDelta => prevDelta / 2); } if (!isDeleting && updatedText === fullText) { setIsDeleting(true); setDelta(period); } else if (isDeleting && updatedText === '') { setIsDeleting(false); setLoopNum(loopNum + 1); setDelta(300); } }; return (<span className="typewriter-text">{text}</span>);};
const HomePage = () => { const homePageStyles = ` .grid-background { background-color: ${newThemeColors.background}; background-image: linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px); background-size: 40px 40px; overflow: hidden; } .hero-section { min-height: calc(100vh - 64px); display: flex; align-items: center; } .typewriter-wrapper { display: flex; align-items: baseline; } .typewriter-wrapper .ant-typography { font-size: 4rem; font-weight: 700; letter-spacing: 1px; color: ${newThemeColors.accent}; white-space: nowrap; } .typewriter-text { border-right: 4px solid ${newThemeColors.accent}; animation: blink 0.75s step-end infinite; padding-right: 2px;} @keyframes blink { from, to { border-color: transparent } 50% { border-color: ${newThemeColors.accent}; } } .image-container { position: relative; display: flex; justify-content: center; align-items: center; } .image-wrapper { max-width: 450px; width: 100%; } @media (max-width: 991px) { .hero-section { flex-direction: column-reverse; text-align: center; justify-content: center; min-height: calc(100vh - 64px); padding-top: 40px; padding-bottom: 40px; } .image-wrapper { margin-bottom: 40px; } .typewriter-wrapper { justify-content: center; } .typewriter-wrapper .ant-typography { font-size: 2.5rem; } } `; return (<div className="grid-background"><style>{homePageStyles}</style><div style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}><Row className="hero-section" align="middle" gutter={[64, 32]}><Col lg={14} xs={24}><Title level={4} style={{ color: newThemeColors.text }}>Hello!</Title><Title level={2} style={{ color: newThemeColors.text }}>My name is Thanh Dien</Title><div className="typewriter-wrapper"><Title style={{ marginRight: '1rem', color: newThemeColors.text }}>I'm a</Title><Title><Typewriter toRotate={['Developer', 'Product Manager', 'DevOps Engineer', 'UI/UX Designer']} period={2000} /></Title></div><Paragraph style={{fontSize: '16px', marginTop: '20px'}}>I am a Full-Stack Developer with 2 years of experience, specializing not only in creating complete mobile and web applications but also in project management and system deployment. I have hands-on experience in building and deploying systems to servers for client use, as well as leading a small team to gather and analyze functional requirements. With a burning passion for technology and strong UI/UX design skills, I am eager to contribute to a modern work environment and create valuable products.</Paragraph><Space size="large" style={{fontSize: '24px', marginTop: '20px'}}><a href="mailto:thanhdiensett@gmail.com" target="_blank"><MailOutlined/></a><a href="https://github.com/ThanhDienGIT" target="_blank"><GithubOutlined/></a><a href="https://www.facebook.com/nguyen.tran.thanh.ien/" target="_blank"><FacebookOutlined/></a></Space></Col><Col lg={10} xs={24} className="image-container"><div className="image-wrapper"><img src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-anime-boy-lanh-lung-trang-den-inkythuatso-01-13-51-13.jpg" alt="Avatar" style={{ width: '100%', borderRadius: '50%', boxShadow: `0 0 30px ${newThemeColors.secondary}` }} /></div></Col></Row></div></div>)};
const ProjectCard = ({ project, isEven }) => { const ref = useRef(null); const isInView = useInView(ref, { once: true, amount: 0.5 }); return ( <Row ref={ref} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: '80px', alignItems: 'center' }}><Col xs={24} md={12} order={isEven ? 1 : 2}><motion.div initial={{ opacity: 0, x: isEven ? -100 : 100 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}><Text type="secondary">{project.category.toUpperCase()}</Text><Title level={3} style={{ marginTop: 0, marginBottom: '16px' }}>{project.title}</Title><Paragraph>{project.description}</Paragraph><div style={{ marginBottom: '16px' }}><Text strong>Thời gian:</Text> {project.startDate} - {project.endDate}</div><div style={{ marginBottom: '24px' }}><Text strong>Trạng thái:</Text><Progress percent={project.statusPercent} status="active" format={() => project.status} /></div><div>{Object.entries(project.tags).map(([category, tags]) => (tags.length > 0 && <div key={category} style={{ marginBottom: '8px' }}><Text strong style={{ textTransform: 'capitalize' }}>{category}: </Text><Space size={[0, 8]} wrap>{tags.map(tag => <Tag key={tag} color="geekblue">{tag}</Tag>)}</Space></div>))}</div></motion.div></Col><Col xs={24} md={12} order={isEven ? 2 : 1}><motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}><Card hoverable style={{ border: `1px solid #e0e0e0`, borderRadius: '12px' }} cover={<img alt={project.title} src={project.image} style={{ height: '300px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />}/></motion.div></Col></Row>);};
const ProjectsPageV2 = () => { return ( <div style={{ maxWidth: '1200px', margin: 'auto' }}><Title level={2} style={{ textAlign: 'center', color: newThemeColors.primary, marginBottom: '60px' }}>Các Dự Án Đã Thực Hiện</Title>{projectsData.map((project, index) => ( <ProjectCard key={index} project={project} isEven={index % 2 === 0} /> ))}</div>);};
const Animation = () => { return ( <div><iframe src='https://my.spline.design/draganddropjengacopy-UyFxwl4uaoFi9L8sohSAaJyd/' width={'100%'} height={1200}/></div> )};


/* ===================================================================
 * --- PHẦN 4: CẤU HÌNH ROUTER VÀ BỐ CỤC CHÍNH (MAIN LAYOUT) ---
 * ===================================================================
 */

const routesConfig = [
  { path: '/', label: 'Trang chủ', component: <HomePage />, icon: <HomeOutlined /> },
  { path: '/projects', label: 'Dự án', component: <ProjectsPageV2/>, icon: <ProjectOutlined/> },
  { path: '/products', label: 'Sản phẩm', component: <ProductsPage />, icon: <AppstoreOutlined /> },
  { path: '/profile', label: 'Thông tin', component: <CVPage />, icon: <UserOutlined /> },
  { path: '/flippable-skills', label: 'Kỹ Năng', component: <FlippableSkillsPage />, icon: <CodeOutlined /> },
  { path: '/skills-map', label: 'Bản đồ Kỹ năng', component: <SkillsChartPage />, icon: <DotChartOutlined /> },
  { path: '/particles', label: 'Hiệu ứng', component: <ParticlesPage />, icon: <ExperimentOutlined /> },
  { path: '/contact', label: 'Liên hệ', component: <ContactPage />, icon: <MailOutlined /> },
  { path: '/animation3D', label: 'Robot 3D', component: <Animation />, icon: <ExperimentOutlined /> },
];

const AppContent = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isAnimationPage = location.pathname === '/animation3D';

    const mobileMenuStyles = ` @media (max-width: 767px) { .ant-layout-header { padding: 0 16px !important; } .ant-menu-horizontal { border-bottom: none !important; } .ant-menu-item { padding: 0 12px !important; } .ant-menu-item-selected { background-color: ${newThemeColors.primary} !important; border-radius: 8px; } .ant-menu-item-selected a, .ant-menu-item-selected .anticon { color: white !important; } .ant-menu-item-selected a:hover { color: white !important; } } `;
    
    const PageWrapper = ({ children }) => ( <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>{children}</motion.div> );

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
              {mobileMenuStyles}
            </style>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10, background: 'rgba(253, 245, 244, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #e0e0e0' }}>
                <Menu theme="light" mode="horizontal" selectedKeys={[location.pathname]} style={{ flex: 1, minWidth: 0, justifyContent: 'center', background: 'transparent' }} overflowedIndicator={ <Button type="primary" shape="circle" icon={<MenuOutlined />} /> } >
                    {routesConfig.map(route => (<Menu.Item key={route.path} icon={route.icon}><Link to={route.path}>{route.label}</Link></Menu.Item>))}
                </Menu>
            </Header>

            <Content style={{ padding: isHomePage || isAnimationPage ? '0' : '24px', background: newThemeColors.background, flex: '1 0 auto', position: 'relative' }}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {routesConfig.map(route => (<Route key={route.path} path={route.path} element={<PageWrapper>{route.component}</PageWrapper>} />))}
                    </Routes>
                </AnimatePresence>
            </Content>

            {!(isHomePage || isAnimationPage) && (
                <Footer style={{ background: newThemeColors.cardBackground, color: newThemeColors.text, padding: '40px 24px', borderTop: '1px solid #dee2e6' }}>
                  <div style={{ maxWidth: '1200px', margin: 'auto' }}>
                    <Row justify="center" align="top" gutter={[48, 48]}><Col xs={24} md={12} lg={8}><Paragraph style={{ textAlign: 'center' }}>"Với mong muốn mang đến những sản phẩm chất lượng và những thông tin hữu ích, tôi cam kết mang đến cho các khách hàng những trải nghiệm tuyệt vời nhất."</Paragraph><Space size="large" style={{ display: 'flex', justifyContent: 'center', fontSize: '24px', marginTop: '20px' }}><a href="#" target="_blank"><FacebookOutlined /></a><a href="#" target="_blank"><InstagramOutlined /></a><a href="#" target="_blank"><YoutubeOutlined /></a><a href="#" target="_blank"><TwitterOutlined /></a></Space></Col></Row>
                    <Divider style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                    <Row justify="center" align="top" gutter={[32, 32]}><Col xs={12} sm={8} md={4}><Title level={5}>VỀ TÔI</Title><Link to="/profile" style={{ display: 'block', marginBottom: '8px' }}>Thông tin</Link><Link to="/products" style={{ display: 'block', marginBottom: '8px' }}>Sản phẩm</Link></Col><Col xs={12} sm={8} md={4}><Title level={5}>HỖ TRỢ</Title><Link to="/contact" style={{ display: 'block', marginBottom: '8px' }}>Liên hệ</Link><a href="#" style={{ display: 'block', marginBottom: '8px' }}>Câu hỏi thường gặp</a></Col><Col xs={24} sm={8} md={4}><Title level={5}>LIÊN HỆ</Title><Paragraph style={{ margin: 0 }}>{cvData.contact.phone}</Paragraph><Paragraph style={{ margin: 0 }}>{cvData.contact.email}</Paragraph></Col></Row>
                     <Divider style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                     <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: '20px' }}>© Bản quyền thuộc về Thanh Điền</Text>
                  </div>
                </Footer>
            )}
        </Layout>
    );
}

function App() {
  return (
    <ConfigProvider theme={{
      token: { 
        colorPrimary: newThemeColors.primary, 
        colorTextBase: newThemeColors.text,
        colorBgBase: newThemeColors.background,
        fontFamily: 'Roboto, sans-serif',
      },
      components: {
        Menu: {
            itemSelectedBg: newThemeColors.primary,
            itemSelectedColor: 'white',
        }
      }
    }}>
        <BrowserRouter><AppContent /></BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
