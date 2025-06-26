import React from 'react';
import { CheckCircle, X, Calendar, MessageCircle, Phone } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
  customerName: string;
  submissionType: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  submissionId,
  customerName,
  submissionType
}) => {
  const phoneNumber = '+919120112701';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}`;
  const callUrl = `tel:${phoneNumber}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-[90%] sm:max-w-[480px] md:max-w-[420px] p-6 md:p-8 relative animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-forest-400 hover:text-forest-600 transition-colors"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div className="text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h3 className="font-playfair text-xl md:text-2xl font-bold text-forest-500 mb-2">
            Thank You, {customerName}!
          </h3>
          
          <p className="text-forest-600 font-inter text-sm md:text-base mb-4 md:mb-6">
            Your {submissionType} request has been successfully submitted.
          </p>

          {/* Submission ID */}
          <div className="bg-cream-50 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
            <p className="text-forest-400 font-inter text-xs md:text-sm mb-1">Reference ID</p>
            <p className="font-inter font-semibold text-forest-500 text-base md:text-lg">
              {submissionId}
            </p>
          </div>

          {/* Contact Promise */}
          <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8">
            <h4 className="font-playfair text-base md:text-lg font-semibold text-forest-500 mb-3">
              What happens next?
            </h4>
            <div className="space-y-2 md:space-y-3 text-left">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-forest-500 font-semibold text-xs md:text-sm">1</span>
                </div>
                <p className="text-forest-600 font-inter text-xs md:text-sm">
                  Our team will review your request within 30 minutes
                </p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-forest-500 font-semibold text-xs md:text-sm">2</span>
                </div>
                <p className="text-forest-600 font-inter text-xs md:text-sm">
                  <strong>Our team will contact you shortly</strong> via phone or email
                </p>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gold-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-forest-500 font-semibold text-xs md:text-sm">3</span>
                </div>
                <p className="text-forest-600 font-inter text-xs md:text-sm">
                  We'll help you plan your perfect PICKNIK experience
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact Options */}
          <div className="space-y-2 md:space-y-3">
            <p className="text-forest-500 font-inter font-medium text-xs md:text-sm">
              Need immediate assistance?
            </p>
            <div className="flex space-x-2 md:space-x-3">
              <a 
                href={callUrl}
                className="flex-1 bg-forest-500 hover:bg-forest-600 text-white py-2 md:py-3 px-3 md:px-4 rounded-full font-inter font-medium text-xs md:text-sm transition-colors flex items-center justify-center space-x-1 md:space-x-2"
              >
                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                <span>Call Us</span>
              </a>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 md:py-3 px-3 md:px-4 rounded-full font-inter font-medium text-xs md:text-sm transition-colors flex items-center justify-center space-x-1 md:space-x-2"
              >
                <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 md:mt-6 bg-cream-100 hover:bg-cream-200 text-forest-500 py-2 md:py-3 rounded-full font-inter font-medium text-xs md:text-sm transition-colors"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 