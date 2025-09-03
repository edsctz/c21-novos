import { useState, useEffect } from 'react';

const LeadFormSticky = () => {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
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
      // Get property ID from URL path
      const pathSegments = window.location.pathname.split('/').filter(segment => segment);
      const propertyId = pathSegments.length > 0 ? pathSegments[0] : 'squaredesign';
      
      // Get UTM data from localStorage
      const utmData = JSON.parse(localStorage.getItem('utmData') || '{}');
      
      const submitData = {
        nome: formData.nome,
        telefone: formData.whatsapp,
        ...utmData,
        property_id: propertyId,
        property_name: propertyId === 'squaredesign' ? 'Square Design Residence' : propertyId,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        form_id: 'sticky-form',
        form_type: 'sticky_form'
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
      
      // Import fallback utility
      const { submitWithFallback } = await import('/src/utils/webhook-fallback.js');
      
      // Use fallback submission method
      const result = await submitWithFallback({
        nome: formData.nome,
        telefone: formData.whatsapp
      }, propertyId);
      
      if (result.success) {
        // Success feedback
        alert('Obrigado! Em breve entraremos em contato.');
        console.log('Form submitted via:', result.method);
        
        // Reset form
        setFormData({
          nome: '',
          whatsapp: ''
        });
      } else {
        throw new Error('Submission failed');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible || isClosed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-obsessed-grey border-t-4 border-relentless-gold shadow-2xl transform transition-transform duration-300 ease-in-out">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Close Button */}
          <button
            onClick={() => setIsClosed(true)}
            className="absolute -top-1 right-0 sm:top-0 sm:right-2 text-gray-400 hover:text-white transition-colors duration-200 text-xl font-bold w-6 h-6 flex items-center justify-center"
            aria-label="Fechar formulário"
          >
            ×
          </button>
          
          {/* Form Title */}
          <div className="text-center lg:text-left pr-6 sm:pr-0">
            <h3 className="text-sm sm:text-lg font-bold text-relentless-gold mb-1">
              Receba preços e agende uma visita
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Condições especiais de pré-lançamento
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
              <div className="relative">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`form-input bg-white text-digital-black placeholder-gray-500 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded w-full sm:w-32 ${errors.nome ? 'border-digital-highlight-red' : ''}`}
                  required
                />
                {errors.nome && (
                  <span className="absolute -bottom-4 left-0 text-xs text-digital-highlight-red">
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
                  className={`form-input bg-white text-digital-black placeholder-gray-500 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded w-full sm:w-36 ${errors.whatsapp ? 'border-digital-highlight-red' : ''}`}
                  required
                />
                {errors.whatsapp && (
                  <span className="absolute -bottom-4 left-0 text-xs text-digital-highlight-red">
                    {errors.whatsapp}
                  </span>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-semibold rounded transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
        
        {/* Privacy Notice */}
        <div className="mt-1 sm:mt-2 text-center">
          <p className="text-xs text-gray-400">
            Ao enviar, você concorda com nossa{' '}
            <a href="/politica-privacidade" className="text-relentless-gold hover:underline">
              Política de Privacidade
            </a>
            {' '}e autoriza o contato via WhatsApp e telefone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadFormSticky;
