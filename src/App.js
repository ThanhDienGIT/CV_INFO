import React, { useState, useEffect, useRef } from 'react';
// Ant Design components and styles
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Timeline,
  ConfigProvider,
  theme,
  Card,
  Tag,
  Menu,
  Avatar,
  Form,
  Input,
  Button,
  message,
  Rate,
} from 'antd';
import {
  CalendarOutlined,
  HomeOutlined,
  PhoneOutlined,
  GithubOutlined,
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  DotChartOutlined, 
  ExperimentOutlined, 
  CodeOutlined,
} from '@ant-design/icons';

// --- CÁC THƯ VIỆN BÊN THỨ 3 ---
// React Router
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
// Biểu đồ
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';


const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

// ===================================================================
// --- DỮ LIỆU (Bạn có thể thay đổi dữ liệu ở đây) ---
// ===================================================================

const cvData = {
  name: 'Nguyễn Trần Thanh Điền',
  title: 'Developer & Product Manager',
  avatar: 'https://placehold.co/400x400/262626/DAA520?text=TĐ', 
  contact: {
    dob: '13/06/2000',
    address: '',
    phone: '+84 966 631 453',
    email: 'thanhdiensett@gmail.com',
    github: 'ThanhDienGIT',
  },
  introduction:
    'Với nhiều năm kinh nghiệm trong lĩnh vực công nghệ thông tin, tôi đã làm việc trong nhiều vai trò khác nhau từ lập trình viên đến quản lý sản phẩm. Tôi đam mê công nghệ và luôn tìm kiếm cơ hội để học hỏi và phát triển bản thân. Tôi có khả năng làm việc nhóm tốt và luôn sẵn sàng hỗ trợ đồng nghiệp.',
  skills: [
    'Ngôn ngữ lập trình: JavaScript, TypeScript, PHP',
    'Frameworks: ReactJS, NodeJS, Laravel, NestJS, NextJS',
    'Cơ sở dữ liệu: MySQL, MongoDB, PostgreSQL, oracle',
    'Quản lý source code: Git, GitHub, GitLab',
    'Kỹ năng phân tích và giải quyết vấn đề',
    'Kỹ năng giao tiếp và làm việc nhóm',
    'Kỹ năng quản lý thời gian và dự án',
  ],
  certificates: [
    { name: 'AWS Cloud Technical & Practitioner Essentials', date: '29/12/2023' },
    { name: 'Quản trị mạng Cisco cơ bản - CCNA', date: '29/12/2023' },
  ],
  experience: [
    { role: 'DEVELOPER', company: 'VHEC', period: '2023', responsibilities: ['Dev', 'Phát triển và bảo trì các ứng dụng web'] },
    { role: 'DEVELOPER', company: 'VNPT', period: '2023 - Hiện tại', responsibilities: ['Dev', 'Project Manager', 'Support kỹ thuật cho khách hàng.', 'Phát triển và bảo trì các ứng dụng web và di động.'] },
  ],
  education: [{ degree: 'KỸ SƯ KỸ THUẬT PHẦN MỀM', university: 'ĐẠI HỌC CẦN THƠ', period: '2018 - 2022' }],
};

const affiliateProducts = [
    { id: 1, name: '[6.6-VC ĐẾN 20%] Thùng 24 Lon Nước Tăng Lực Sting Vàng', image: 'https://placehold.co/600x600/ffc107/000000?text=Sting+Gold', price: '226.000₫', sold: '2k', tags: ['Mall', '10% Giảm'], link: '#', discountPercentage: '-6%', shopName: 'Suntory Pepsico' },
    { id: 2, name: 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', image: 'https://placehold.co/600x600/333333/FFFFFF?text=Laptop+Gaming', price: '19.990.000₫', sold: '560', tags: ['Mall', 'Trả góp 0%'], link: '#', discountPercentage: '-20%', extraInfo: 'Hàng quốc tế' },
];

const flippableSkillsData = [
    { name: 'React', icon: 'https://placehold.co/100x100/333333/61DAFB?text=React', description: 'Next.js, Tailwind, MUI, SEO, HTML/CSS, Shadon-ui, Dark-mode, multi language.', rating: 5 },
    { name: 'Node.js', icon: 'https://placehold.co/100x100/333333/339933?text=Node', description: 'Nest.js, Socket, API, Crawl Data, Authenticate, Swagger, Schedule.', rating: 4 },
    { name: 'Database', icon: 'https://placehold.co/100x100/333333/4479A1?text=DB', description: 'MySQL, Mongo db, Postgres, SQL Server.', rating: 4 },
    { name: 'DevOps', icon: 'https://placehold.co/100x100/333333/2496ED?text=Docker', description: 'I can use docker to run the project, deploy, CI/CD with Gitlab-runner, use Nginx.', rating: 3 },
];

const goldColor = '#DAA520';

// ===================================================================
// --- CÁC COMPONENT TRANG (Pages) ---
// ===================================================================

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}><Title level={4} style={{ borderBottom: `2px solid ${goldColor}`, paddingBottom: '8px', marginBottom: '16px', color: goldColor, letterSpacing: '1px' }}>{title.toUpperCase()}</Title>{children}</div>
);

const CVPage = () => (
  <div style={{ background: '#262626', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', maxWidth: '1100px', margin: 'auto' }}>
    <Header style={{ backgroundColor: 'transparent', padding: 0, height: 'auto', textAlign: 'center', marginBottom: '24px' }}><Avatar size={128} src={cvData.avatar} style={{ border: `4px solid ${goldColor}`, marginBottom: '20px' }} /><Title style={{ color: goldColor, marginBottom: 0, letterSpacing: '2px' }}>{cvData.name}</Title><Title level={4} style={{ color: 'rgba(255, 255, 255, 0.65)', marginTop: '8px' }}>{cvData.title}</Title></Header>
    <Row gutter={[16, 16]} justify="center" style={{ textAlign: 'center', marginBottom: '32px' }}><Col xs={24} sm={12} md={6}><Space><CalendarOutlined /> <Text>{cvData.contact.dob}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><PhoneOutlined /> <Text>{cvData.contact.phone}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><MailOutlined /> <Text>{cvData.contact.email}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><GithubOutlined /> <Text>{cvData.contact.github}</Text></Space></Col></Row>
    <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
    <Row gutter={48}><Col xs={24} md={8}><Section title="Giới thiệu"><Paragraph>{cvData.introduction}</Paragraph></Section><Section title="Kỹ năng">{cvData.skills.map((skill, index) => <Paragraph key={index}>• {skill}</Paragraph>)}</Section><Section title="Chứng chỉ">{cvData.certificates.map((cert, index) => <div key={index}><Text strong>{cert.name}</Text> <Text type="secondary">({cert.date})</Text></div>)}</Section></Col><Col xs={24} md={16}><Section title="Kinh nghiệm làm việc"><Timeline>{cvData.experience.map((exp, index) => <Timeline.Item key={index} color={goldColor}><Title level={5}>{exp.role}</Title><Text strong>{exp.company}</Text> | <Text type="secondary">{exp.period}</Text><ul style={{ paddingLeft: 20, marginTop: 8 }}>{exp.responsibilities.map((res, i) => <li key={i}><Paragraph style={{ margin: 0 }}>{res}</Paragraph></li>)}</ul></Timeline.Item>)}</Timeline></Section><Section title="Học vấn"><Timeline>{cvData.education.map((edu, index) => <Timeline.Item key={index} color={goldColor}><Title level={5}>{edu.degree}</Title><Text strong>{edu.university}</Text> | <Text type="secondary">{edu.period}</Text></Timeline.Item>)}</Timeline></Section></Col></Row>
  </div>
);

const ProductsPage = () => (
  <div style={{ maxWidth: '1200px', margin: 'auto' }}>
    <Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '40px' }}>Sản Phẩm Gợi Ý</Title>
    <Row gutter={[24, 24]}>{affiliateProducts.map(product => (<Col key={product.id} xs={24} sm={12} md={8} lg={6}><a href={product.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><Card hoverable cover={<div style={{ position: 'relative' }}><img alt={product.name} src={product.image} style={{ aspectRatio: '1 / 1', objectFit: 'cover', width: '100%' }} />{product.discountPercentage && (<Tag color="red" style={{ position: 'absolute', top: 8, right: 8, fontSize: '14px', padding: '2px 8px' }}>{product.discountPercentage}</Tag>)}</div>} style={{ height: '100%', display: 'flex', flexDirection: 'column' }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}><div style={{ flex: '1 0 auto' }}><Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '8px', minHeight: '44px' }}>{product.name}</Paragraph>{product.shopName && (<Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Bán bởi: {product.shopName}</Text>)}<Space wrap size={[4, 8]} style={{ marginBottom: '8px' }}>{product.tags.map(tag => <Tag key={tag} color="gold">{tag}</Tag>)}{product.extraInfo && <Tag color="blue">{product.extraInfo}</Tag>}</Space></div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}><Text style={{ color: goldColor, fontSize: '1.2em', fontWeight: 'bold' }}>{product.price}</Text><Text type="secondary">Đã bán {product.sold}</Text></div></Card></a></Col>))}</Row>
  </div>
);

const ContactPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {console.log('Received values of form: ', values); message.success('Cảm ơn bạn đã liên hệ!'); form.resetFields();};
  return (<div style={{ maxWidth: '800px', margin: 'auto', background: '#262626', padding: '40px', borderRadius: '8px' }}><Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '10px' }}>Liên Hệ Với Tôi</Title><Paragraph style={{ textAlign: 'center', marginBottom: '40px' }}>Mọi thắc mắc hoặc cơ hội hợp tác, xin vui lòng điền vào form bên dưới.</Paragraph><Form form={form} layout="vertical" onFinish={onFinish}><Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}><Input placeholder="Nguyễn Văn A" /></Form.Item><Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}><Input placeholder="example@email.com" /></Form.Item><Form.Item name="phone" label="Số điện thoại (Tùy chọn)"><Input placeholder="09xxxxxxxx" /></Form.Item><Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}><TextArea rows={5} placeholder="Nội dung bạn muốn trao đổi..." /></Form.Item><Form.Item style={{ textAlign: 'center' }}><Button type="primary" htmlType="submit" size="large">Gửi liên hệ</Button></Form.Item></Form></div>);
};

const ParticlesPage = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); let animationFrameId;
        const parent = canvas.parentElement; canvas.width = parent.offsetWidth; canvas.height = parent.offsetHeight;
        let particlesArray = []; const numberOfParticles = 100;
        class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 5 + 1; this.speedX = Math.random() * 3 - 1.5; this.speedY = Math.random() * 3 - 1.5; } update() { if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX; if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY; this.x += this.speedX; this.y += this.speedY; } draw() { ctx.fillStyle = goldColor; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); } }
        function init() { particlesArray = []; for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); } }
        function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); particlesArray[i].draw(); } animationFrameId = requestAnimationFrame(animate); }
        init(); animate();
        return () => { cancelAnimationFrame(animationFrameId); };
    }, []);
    return (<div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 188px)' }}><canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}/><div style={{ position: 'relative', zIndex: 1, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '80%' }}><Title style={{ color: goldColor }}>Hiệu Ứng Hạt Tự Triển Khai</Title><Paragraph style={{fontSize: '16px'}}></Paragraph><Paragraph type="secondary">Các hạt chuyển động tự do</Paragraph></div></div>);
};

const SkillsChartPage = () => {
    const skillData = [ { subject: 'JavaScript', A: 90 }, { subject: 'TypeScript', A: 85 }, { subject: 'ReactJS', A: 95 }, { subject: 'NodeJS', A: 80 }, { subject: 'Database', A: 75 }, { subject: 'DevOps', A: 60 } ];
    return (<div style={{ maxWidth: '1000px', margin: 'auto', textAlign: 'center' }}><Title level={2} style={{ color: goldColor, marginBottom: '20px' }}>Bản Đồ Kỹ Năng</Title><Paragraph style={{fontSize: '16px', maxWidth: '800px', margin: '0 auto 40px auto'}}>Biểu đồ kỹ năng lập trình</Paragraph><Row justify="center"><Col xs={24} md={16} style={{ height: '500px' }}><ResponsiveContainer width="100%" height="100%"><RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}><Tooltip contentStyle={{ backgroundColor: '#262626', border: `1px solid ${goldColor}`}} labelStyle={{ color: goldColor }} /><PolarGrid stroke="rgba(255, 255, 255, 0.2)" /><PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255, 255, 255, 0.85)' }} /><PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} /><Radar name="Thanh Điền" dataKey="A" stroke={goldColor} fill={goldColor} fillOpacity={0.6} /></RadarChart></ResponsiveContainer></Col></Row><Paragraph type="secondary" style={{marginTop: '20px'}}>Biểu đồ hiển thị danh sách kỹ năng một cách trực quan</Paragraph></div>);
};

const FlippableSkillsPage = () => {
    const flipCardStyles = ` .flip-card { background-color: transparent; width: 100%; height: 250px; perspective: 1000px; } .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d; } .flip-card:hover .flip-card-inner { transform: rotateY(180deg); } .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; border-radius: 8px; } .flip-card-front { background-color: #262626; color: white; border: 1px solid #424242; } .flip-card-back { background-color: ${goldColor}; color: black; transform: rotateY(180deg); } `;
    return (<div style={{ maxWidth: '1200px', margin: 'auto' }}><style>{flipCardStyles}</style><Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '20px' }}>Bảng Kỹ Năng Tương Tác</Title><Paragraph style={{textAlign: 'center', fontSize: '16px', maxWidth: '800px', margin: '0 auto 40px auto'}}>Di chuột qua các thẻ để xem chi tiết kỹ năng bên trong</Paragraph><Row gutter={[24, 24]}>{flippableSkillsData.map(skill => (<Col key={skill.name} xs={24} sm={12} md={8} lg={6}><div className="flip-card"><div className="flip-card-inner"><div className="flip-card-front"><Avatar size={64} src={skill.icon} style={{marginBottom: '16px'}} /><Title level={4}>{skill.name}</Title><Rate disabled defaultValue={skill.rating} /></div><div className="flip-card-back"><Title level={5} style={{color: 'black'}}>{skill.name}</Title><Paragraph style={{color: 'black', flexGrow: 1}}>{skill.description}</Paragraph><Text strong style={{color: 'black'}}>Mức độ thành thạo:</Text><Rate disabled defaultValue={skill.rating} /></div></div></div></Col>))}</Row></div>);
};

// --- TRANG CHỦ MỚI VỚI HIỆU ỨNG GÕ CHỮ ---
const Typewriter = ({ toRotate, period }) => {
    const [text, setText] = useState('');
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [delta, setDelta] = useState(200 - Math.random() * 100);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);
        return () => { clearInterval(ticker) };
    }, [text]);

    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(300);
        }
    };

    // Trả về văn bản cùng với con trỏ chớp chớp
    return (
        <>
            {text}
            <span className="cursor-blink">|</span>
        </>
    );
};

const HomePage = () => {
    const homePageStyles = `
        .grid-background {
            background-color: #1d1d1d;
            background-image: linear-gradient(rgba(255,255,255,.07) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.07) 2px, transparent 2px);
            background-size: 50px 50px;
            overflow: hidden; /* Ngăn thanh cuộn ngang */
        }
        .hero-section {
            min-height: calc(100vh - 64px); /* Điều chỉnh chiều cao cho phù hợp */
            display: flex;
            align-items: center;
        }
        .typewriter-container .ant-typography {
            font-size: 4rem;
            font-weight: 700;
            letter-spacing: 1px;
            color: ${goldColor};
            display: inline; /* Giúp Title vừa với nội dung */
            white-space: nowrap;
        }
        /* CSS cho con trỏ chớp chớp */
        .cursor-blink {
            font-weight: 700;
            animation: blink 0.75s step-end infinite;
        }
        @keyframes blink {
            from, to { color: transparent }
            50% { color: ${goldColor}; }
        }
        .image-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .image-wrapper {
            max-width: 450px;
            width: 100%;
        }
        @media (max-width: 991px) {
            .hero-section {
                flex-direction: column;
                text-align: center;
                justify-content: center;
                min-height: calc(100vh - 128px);
                padding-top: 40px;
                padding-bottom: 40px;
            }
            .image-wrapper {
                margin-top: 40px;
            }
            .typewriter-container .ant-typography {
                font-size: 2.5rem;
            }
        }
    `;

    return (
        <div className="grid-background">
            <style>{homePageStyles}</style>
            <div style={{ maxWidth: '1200px', margin: 'auto', padding: '24px' }}>
                <Row className="hero-section" align="middle" gutter={[64, 32]}>
                    <Col lg={16} xs={24}>
                        <Title level={4}>Hello!</Title>
                        <Title level={2}>My name is Thanh Dien</Title>
                        <div className="typewriter-container">
                             <Title>
                                I'm a <Typewriter
                                    toRotate={['Developer', 'Product Manager', 'DevOps Engineer', 'UI/UX Designer']}
                                    period={2000}
                                />
                             </Title>
                        </div>
                        <Paragraph style={{fontSize: '16px', marginTop: '20px'}}>
I am a Full-Stack Developer with 2 years of experience, specializing not only in creating complete mobile and web applications but also in project management and system deployment. I have hands-on experience in building and deploying systems to servers for client use, as well as leading a small team to gather and analyze functional requirements. With a burning passion for technology and strong UI/UX design skills, I am eager to contribute to a modern work environment and create valuable products.                        </Paragraph>
                        <Space size="large" style={{fontSize: '24px', marginTop: '20px'}}>
                            <a href="mailto:thanhdiensett@gmail.com" target="_blank"><MailOutlined/></a>
                            <a href="https://github.com/ThanhDienGIT" target="_blank"><GithubOutlined/></a>
                            <a href="https://www.facebook.com/nguyen.tran.thanh.ien/" target="_blank"><FacebookOutlined/></a>
                        </Space>
                    </Col>
                    <Col lg={8} xs={24} className="image-container">
                        <div className="image-wrapper">
                             <img 
                                src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-anime-boy-lanh-lung-trang-den-inkythuatso-01-13-51-13.jpg" 
                                alt="Avatar" 
                                style={{ width: '100%', height: '100%', borderRadius :'100%'}}
                             />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

const Animation = () => {
  return (
    <div>
        <iframe src='https://my.spline.design/genkubgreetingrobot-kBqWlcrWbK8ucWtfmwyWmmeb/' width={'100%'} height={'100%'}/>
    </div>
  )
}


// ===================================================================
// --- CẤU HÌNH ROUTER VÀ BỐ CỤC CHÍNH ---
// ===================================================================

const routesConfig = [
  { path: '/', label: 'Trang chủ', component: <HomePage />, icon: <HomeOutlined /> },
  { path: '/products', label: 'Sản phẩm', component: <ProductsPage />, icon: <AppstoreOutlined /> },
  { path: '/profile', label: 'Thông tin cá nhân', component: <CVPage />, icon: <UserOutlined /> },
  { path: '/flippable-skills', label: 'Kỹ Năng Lật', component: <FlippableSkillsPage />, icon: <CodeOutlined /> },
  { path: '/skills-map', label: 'Bản đồ tương tác', component: <SkillsChartPage />, icon: <DotChartOutlined /> },
  { path: '/particles', label: 'Hiệu ứng hạt', component: <ParticlesPage />, icon: <ExperimentOutlined /> },
  { path: '/contact', label: 'Liên hệ', component: <ContactPage />, icon: <MailOutlined /> },
  { path: '/animation3D', label: 'Robot 3D', component: <Animation />, icon: <MailOutlined /> },
];

const AppContent = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const mobileMenuStyles = ` @media (max-width: 767px) { .ant-layout-header { padding: 0 16px !important; } .ant-menu-horizontal { border-bottom: none !important; } .ant-menu-item { padding: 0 12px !important; } .ant-menu-item-selected { background-color: ${goldColor} !important; border-radius: 8px; } .ant-menu-item-selected a, .ant-menu-item-selected .anticon { color: black !important; } .ant-menu-item-selected a:hover { color: black !important; } } `;

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <style>{mobileMenuStyles}</style>
            
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}>
                    {routesConfig.map(route => (<Menu.Item key={route.path} icon={route.icon}><Link to={route.path}>{route.label}</Link></Menu.Item>))}
                </Menu>
            </Header>

            <Content style={{ 
                padding: isHomePage ? '0' : '24px', 
                background: '#1d1d1d', 
                flex: '1 0 auto', 
                position: 'relative' 
            }}>
                <Routes>
                    {routesConfig.map(route => (<Route key={route.path} path={route.path} element={route.component} />))}
                </Routes>
            </Content>

            {!isHomePage && (
                <Footer style={{ background: '#141414', color: 'rgba(255, 255, 255, 0.65)', padding: '40px 24px' }}>
                  <div style={{ maxWidth: '1200px', margin: 'auto' }}>
                    <Row justify="center" align="top" gutter={[48, 48]}>
                      <Col xs={24} md={12} lg={8}>
                        <Paragraph style={{ textAlign: 'center' }}>"Với mong muốn mang đến những sản phẩm chất lượng và những thông tin hữu ích, tôi cam kết mang đến cho các khách hàng những trải nghiệm tuyệt vời nhất."</Paragraph>
                        <Space size="large" style={{ display: 'flex', justifyContent: 'center', fontSize: '24px', marginTop: '20px' }}>
                          <a href="#" target="_blank" rel="noopener noreferrer"><FacebookOutlined /></a>
                          <a href="#" target="_blank" rel="noopener noreferrer"><InstagramOutlined /></a>
                          <a href="#" target="_blank" rel="noopener noreferrer"><YoutubeOutlined /></a>
                          <a href="#" target="_blank" rel="noopener noreferrer"><TwitterOutlined /></a>
                        </Space>
                      </Col>
                    </Row>
                    <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <Row justify="center" align="top" gutter={[32, 32]}>
                      <Col xs={12} sm={8} md={4}>
                        <Title level={5}>VỀ TÔI</Title>
                        <Link to="/profile" style={{ display: 'block', marginBottom: '8px' }}>Thông tin</Link>
                        <Link to="/products" style={{ display: 'block', marginBottom: '8px' }}>Sản phẩm</Link>
                      </Col>
                       <Col xs={12} sm={8} md={4}>
                        <Title level={5}>HỖ TRỢ</Title>
                        <Link to="/contact" style={{ display: 'block', marginBottom: '8px' }}>Liên hệ</Link>
                        <a href="#" style={{ display: 'block', marginBottom: '8px' }}>Câu hỏi thường gặp</a>
                      </Col>
                      <Col xs={24} sm={8} md={4}>
                         <Title level={5}>LIÊN HỆ</Title>
                         <Paragraph style={{ margin: 0 }}>{cvData.contact.phone}</Paragraph>
                         <Paragraph style={{ margin: 0 }}>{cvData.contact.email}</Paragraph>
                      </Col>
                    </Row>
                     <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                     <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: '20px' }}>© Bản quyền thuộc về Thanh Điền</Text>
                  </div>
                </Footer>
            )}
        </Layout>
    );
}

function App() {
  const { darkAlgorithm } = theme;
  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm, token: { colorPrimary: goldColor, colorBgBase: '#141414' } }}>
        <BrowserRouter><AppContent /></BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
