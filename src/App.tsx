import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Globe, User, DollarSign, ChevronDown, MousePointer } from 'lucide-react';
import './cursor.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'pricing', 'domain', 'about'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white relative overflow-x-hidden">
      {/* Custom cursor */}
      <div 
        className="custom-cursor hidden md:block" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px` 
        }}
      >
        <MousePointer className="text-white" size={24} />
      </div>

      {/* Header */}
      <header className="fixed w-full bg-blue-900/80 backdrop-blur-md z-50 transition-all duration-300 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 animate-fadeIn">
            <Code className="text-blue-300" size={32} />
            <h1 className="text-2xl font-bold text-white">CELAIR</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'services', 'pricing', 'domain', 'about'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative px-2 py-1 transition-all duration-300 hover:text-blue-300 ${
                  activeSection === section ? 'text-blue-300' : 'text-white'
                }`}
              >
                {section === 'home' && 'Главная'}
                {section === 'services' && 'Услуги'}
                {section === 'pricing' && 'Цены'}
                {section === 'domain' && 'Домены'}
                {section === 'about' && 'Обо мне'}
                {activeSection === section && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-300 animate-expandWidth"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 animate-slideDown">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {['home', 'services', 'pricing', 'domain', 'about'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`px-4 py-2 text-left transition-all duration-300 hover:bg-blue-700 rounded ${
                    activeSection === section ? 'bg-blue-700 text-blue-300' : 'text-white'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'services' && 'Услуги'}
                  {section === 'pricing' && 'Цены'}
                  {section === 'domain' && 'Домены'}
                  {section === 'about' && 'Обо мне'}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container mx-auto text-center">
            <div className="animate-fadeInUp">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Создание сайтов под ваши интересы
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Разработаю уникальный сайт, который идеально подойдет под ваши потребности и мои возможности
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Узнать больше
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="px-8 py-3 bg-transparent border-2 border-blue-300 hover:border-blue-400 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Посмотреть цены
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 bg-blue-800/30 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Мои услуги
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Я предлагаю полный спектр услуг по созданию и поддержке веб-сайтов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 animate-fadeInLeft">
                <div className="bg-blue-700/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Code size={32} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Разработка сайтов</h3>
                <p className="text-blue-100">
                  Создание современных, адаптивных и функциональных веб-сайтов под ваши потребности и бюджет.
                </p>
              </div>

              <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 animate-fadeIn delay-100">
                <div className="bg-blue-700/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <Globe size={32} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Регистрация доменов</h3>
                <p className="text-blue-100">
                  Помощь в выборе и регистрации доменного имени для вашего сайта, включая домены в зоне .kz.
                </p>
              </div>

              <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 animate-fadeInRight">
                <div className="bg-blue-700/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <DollarSign size={32} className="text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-300">Доступные цены</h3>
                <p className="text-blue-100">
                  Прозрачное ценообразование и гибкие условия оплаты для клиентов с любым бюджетом.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Цены на услуги
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Прозрачные цены без скрытых платежей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 animate-fadeInLeft">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-300">Создание сайта</h3>
                    <p className="text-blue-100 mt-2">Базовая разработка веб-сайта</p>
                  </div>
                  <div className="text-3xl font-bold text-white">10.000 ТГ</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Адаптивный дизайн</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Базовая SEO-оптимизация</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">До 5 страниц</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Базовая функциональность</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/77007492395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  WhatsApp: 77007492395
                </a>
              </div>

              <div className="bg-gradient-to-br from-blue-800/70 to-purple-800/70 backdrop-blur-sm p-8 rounded-xl shadow-lg transition-all duration-300 hover:transform hover:scale-105 animate-fadeInRight">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-blue-300">Регистрация домена</h3>
                    <p className="text-blue-100 mt-2">Домен в зоне .kz</p>
                  </div>
                  <div className="text-3xl font-bold text-white">Зависит от домена</div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Регистрация домена (например, названиесайта.kz)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Привязка домена к хостингу</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Настройка DNS</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-blue-100">Помощь в продлении домена</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/77007492395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-purple-500 hover:bg-purple-600 rounded-full text-white font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  WhatsApp: 77007492395
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Section */}
        <section id="domain" className="py-20 px-4 bg-blue-800/30 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Доменные имена
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Помогу выбрать и зарегистрировать идеальное доменное имя для вашего проекта
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="animate-fadeInLeft">
                <h3 className="text-2xl font-bold mb-6 text-blue-300">Что такое домен?</h3>
                <p className="text-blue-100 mb-4">
                  Доменное имя — это уникальный адрес вашего сайта в интернете, например, названиесайта.kz. 
                  Хороший домен легко запоминается и отражает суть вашего бизнеса или проекта.
                </p>
                <p className="text-blue-100 mb-4">
                  Я помогу вам:
                </p>
                <ul className="space-y-3 mb-8 text-blue-100">
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Выбрать подходящее доменное имя</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Зарегистрировать домен в зоне .kz или другой</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Настроить и привязать домен к вашему сайту</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Обеспечить своевременное продление домена</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg animate-fadeInRight">
                <h3 className="text-2xl font-bold mb-6 text-blue-300">Популярные доменные зоны</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-800/50 rounded-lg">
                    <span className="text-xl font-semibold text-white">.kz</span>
                    <span className="text-blue-300">Казахстан</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-800/50 rounded-lg">
                    <span className="text-xl font-semibold text-white">.com</span>
                    <span className="text-blue-300">Международный</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-800/50 rounded-lg">
                    <span className="text-xl font-semibold text-white">.ru</span>
                    <span className="text-blue-300">Россия</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-800/50 rounded-lg">
                    <span className="text-xl font-semibold text-white">.org</span>
                    <span className="text-blue-300">Организации</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16 animate-fadeIn">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                Обо мне
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Профессиональный веб-разработчик с опытом создания сайтов под заказ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fadeInLeft">
                <h3 className="text-2xl font-bold mb-6 text-blue-300">Мой подход к работе</h3>
                <p className="text-blue-100 mb-4">
                  Я специализируюсь на создании сайтов под заказ для клиентов с различными потребностями и бюджетами. 
                  Моя цель — разработать для вас сайт, который не только выглядит привлекательно, 
                  но и эффективно решает ваши бизнес-задачи.
                </p>
                <p className="text-blue-100 mb-6">
                  В своей работе я придерживаюсь следующих принципов:
                </p>
                <ul className="space-y-3 mb-8 text-blue-100">
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Индивидуальный подход к каждому проекту</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Соблюдение сроков и бюджета</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Использование современных технологий</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronDown className="text-blue-300 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span>Поддержка после запуска проекта</span>
                  </li>
                </ul>
                <a 
                  href="https://wa.me/77007492395" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                >
                  WhatsApp: 77007492395
                </a>
              </div>

              <div className="order-1 md:order-2 bg-blue-900/50 backdrop-blur-sm p-8 rounded-xl shadow-lg animate-fadeInRight">
                <div className="flex justify-center mb-6">
                  <div className="w-32 h-32 rounded-full bg-blue-700/50 flex items-center justify-center">
                    <User size={64} className="text-blue-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">Веб-разработчик</h3>
                <p className="text-blue-100 text-center mb-6">
                  Создаю современные, адаптивные и функциональные веб-сайты для клиентов из разных сфер бизнеса.
                </p>
                <div className="space-y-4">
                  <div className="bg-blue-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Опыт работы</h4>
                    <p className="text-blue-100">1 год в веб-разработке</p>
                  </div>
                  <div className="bg-blue-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Технологии</h4>
                    <p className="text-blue-100">HTML, CSS, JavaScript, React, WordPress</p>
                  </div>
                  <div className="bg-blue-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-300 mb-2">Проекты</h4>
                    <p className="text-blue-100">10 успешно реализованных проектов</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Code className="text-blue-300" size={32} />
                <h2 className="text-2xl font-bold text-white">CELAIR</h2>
              </div>
              <p className="text-blue-100 mb-6">
                Профессиональная разработка веб-сайтов под ваши потребности и бюджет.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-6">Услуги</h3>
              <ul className="space-y-3 text-blue-100">
                <li>
                  <button onClick={() => scrollToSection('services')} className="hover:text-blue-300 transition-colors">
                    Разработка сайтов
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('domain')} className="hover:text-blue-300 transition-colors">
                    Регистрация доменов
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('pricing')} className="hover:text-blue-300 transition-colors">
                    Цены на услуги
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-6">Контакты</h3>
              <ul className="space-y-3 text-blue-100">
                <li>WhatsApp: 77007492395</li>
                <li>Адрес: г. Алматы, Казахстан</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-100">
            <p>© 2025 CELAIR. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
