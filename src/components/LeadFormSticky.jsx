import { useState, useEffect } from 'react';

const LeadFormSticky = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    interesse: 'comprar'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Formato inválido. Use: (11) 99999-9999';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsApp = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'whatsapp') {
      setFormData(prev => ({
        ...prev,
        [name]: formatWhatsApp(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get UTM data from localStorage
      const utmData = JSON.parse(localStorage.getItem('utmData') || '{}');
      
      const submitData = {
        ...formData,
        ...utmData,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent
      };
      
      // Track form submission
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          event_category: 'Lead Form',
          event_label: 'Sticky Form Submission',
          value: 1
        });
      }
      
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: 'Square Design Residence',
          content_category: 'Real Estate Lead'
        });
      }
      
      // Here you would integrate with your CRM/webhook
      // Example: await fetch('/api/leads', { method: 'POST', body: JSON.stringify(submitData) });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success feedback
      alert('Obrigado! Em breve entraremos em contato.');
      
      // Reset form
      setFormData({
        nome: '',
        whatsapp: '',
        email: '',
        interesse: 'comprar'
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-obsessed-grey border-t-4 border-relentless-gold shadow-2xl transform transition-transform duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Form Title */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-bold text-relentless-gold mb-1">
              Receba preços e agende uma visita
            </h3>
            <p className="text-sm text-gray-300">
              Condições especiais de pré-lançamento
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`form-input bg-white text-digital-black placeholder-gray-500 text-sm px-3 py-2 rounded w-full sm:w-32 ${errors.nome ? 'border-digital-highlight-red' : ''}`}
                  required
                />
                {errors.nome && (
                  <span className="absolute -bottom-5 left-0 text-xs text-digital-highlight-red">
                    {errors.nome}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className={`form-input bg-white text-digital-black placeholder-gray-500 text-sm px-3 py-2 rounded w-full sm:w-36 ${errors.whatsapp ? 'border-digital-highlight-red' : ''}`}
                  required
                />
                {errors.whatsapp && (
                  <span className="absolute -bottom-5 left-0 text-xs text-digital-highlight-red">
                    {errors.whatsapp}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input bg-white text-digital-black placeholder-gray-500 text-sm px-3 py-2 rounded w-full sm:w-40 ${errors.email ? 'border-digital-highlight-red' : ''}`}
                  required
                />
                {errors.email && (
                  <span className="absolute -bottom-5 left-0 text-xs text-digital-highlight-red">
                    {errors.email}
                  </span>
                )}
              </div>
              
              <select
                name="interesse"
                value={formData.interesse}
                onChange={handleInputChange}
                className="form-input bg-white text-digital-black text-sm px-3 py-2 rounded w-full sm:w-32"
              >
                <option value="comprar">Comprar</option>
                <option value="investir">Investir</option>
                <option value="informacoes">Informações</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-6 py-2 text-sm font-semibold rounded transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-400">
            Ao enviar, você concorda com nossa{' '}
            <a href="/politica-privacidade" className="text-relentless-gold hover:underline">
              Política de Privacidade
            </a>
            {' '}e autoriza o contato via WhatsApp, email e telefone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadFormSticky;
