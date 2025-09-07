import React, { useState, useEffect } from 'react';
import { Languages, Copy, Volume2, RotateCcw, ArrowLeftRight, Check, Mic, MicOff, Play, Pause, VolumeX } from 'lucide-react';

const Translator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recentTranslations, setRecentTranslations] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState({ source: false, target: false });
  const [audioSupported, setAudioSupported] = useState(true);

  // Supported languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
  ];

  // Sample translations for demo (in real app, you'd use Google Translate API or similar)
  const sampleTranslations = {
    'en-es': {
      'Hello': 'Hola',
      'Good morning': 'Buenos días',
      'How are you?': '¿Cómo estás?',
      'Thank you': 'Gracias',
      'Goodbye': 'Adiós',
      'Welcome': 'Bienvenido',
      'Please': 'Por favor',
      'Yes': 'Sí',
      'No': 'No'
    },
    'en-fr': {
      'Hello': 'Bonjour',
      'Good morning': 'Bonjour',
      'How are you?': 'Comment allez-vous?',
      'Thank you': 'Merci',
      'Goodbye': 'Au revoir',
      'Welcome': 'Bienvenue',
      'Please': 'S\'il vous plaît',
      'Yes': 'Oui',
      'No': 'Non'
    },
    'en-de': {
      'Hello': 'Hallo',
      'Good morning': 'Guten Morgen',
      'How are you?': 'Wie geht es dir?',
      'Thank you': 'Danke',
      'Goodbye': 'Auf Wiedersehen',
      'Welcome': 'Willkommen',
      'Please': 'Bitte',
      'Yes': 'Ja',
      'No': 'Nein'
    },
    'en-it': {
      'Hello': 'Ciao',
      'Good morning': 'Buongiorno',
      'How are you?': 'Come stai?',
      'Thank you': 'Grazie',
      'Goodbye': 'Arrivederci',
      'Welcome': 'Benvenuto',
      'Please': 'Per favore',
      'Yes': 'Sì',
      'No': 'No'
    },
    'en-pt': {
      'Hello': 'Olá',
      'Good morning': 'Bom dia',
      'How are you?': 'Como está?',
      'Thank you': 'Obrigado',
      'Goodbye': 'Tchau',
      'Welcome': 'Bem-vindo',
      'Please': 'Por favor',
      'Yes': 'Sim',
      'No': 'Não'
    },
    'en-ru': {
      'Hello': 'Привет',
      'Good morning': 'Доброе утро',
      'How are you?': 'Как дела?',
      'Thank you': 'Спасибо',
      'Goodbye': 'До свидания',
      'Welcome': 'Добро пожаловать',
      'Please': 'Пожалуйста',
      'Yes': 'Да',
      'No': 'Нет'
    },
    'en-ja': {
      'Hello': 'こんにちは',
      'Good morning': 'おはようございます',
      'How are you?': '元気ですか？',
      'Thank you': 'ありがとう',
      'Goodbye': 'さようなら',
      'Welcome': 'いらっしゃいませ',
      'Please': 'お願いします',
      'Yes': 'はい',
      'No': 'いいえ'
    },
    'en-ko': {
      'Hello': '안녕하세요',
      'Good morning': '좋은 아침',
      'How are you?': '어떻게 지내세요?',
      'Thank you': '감사합니다',
      'Goodbye': '안녕히 가세요',
      'Welcome': '환영합니다',
      'Please': '제발',
      'Yes': '네',
      'No': '아니요'
    },
    'en-zh': {
      'Hello': '你好',
      'Good morning': '早上好',
      'How are you?': '你好吗？',
      'Thank you': '谢谢',
      'Goodbye': '再见',
      'Welcome': '欢迎',
      'Please': '请',
      'Yes': '是的',
      'No': '不'
    }
  };

  const commonPhrases = [
    'Hello',
    'Good morning',
    'How are you?',
    'Thank you',
    'Goodbye',
    'Welcome',
    'Please',
    'Yes',
    'No'
  ];

  // Check audio support on component mount
  useEffect(() => {
    setAudioSupported('speechSynthesis' in window && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window));
  }, []);

  // Voice Recognition Handler
  const handleVoiceInput = () => {
    if (!audioSupported) {
      alert('Voice input not supported in your browser');
      return;
    }
    
    setIsListening(!isListening);
    // Implementation will be added later
    setTimeout(() => setIsListening(false), 3000); // Demo timeout
  };

  // Enhanced Speak Handler
  const handleSpeak = (text, lang, type = 'source') => {
    if (!audioSupported || !text.trim()) {
      return;
    }

    // Stop any currently playing audio
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying({ source: false, target: false });
      return;
    }

    setIsPlaying(prev => ({ ...prev, [type]: true }));

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsPlaying(prev => ({ ...prev, [type]: false }));
      };
      
      utterance.onerror = () => {
        setIsPlaying(prev => ({ ...prev, [type]: false }));
      };

      speechSynthesis.speak(utterance);
    }
  };

  // Stop all audio
  const handleStopAudio = () => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    setIsPlaying({ source: false, target: false });
  };

  // Mock translation function
  const translateText = async (text) => {
    setIsTranslating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const translationKey = `${sourceLang}-${targetLang}`;
    const translations = sampleTranslations[translationKey];
    
    let translated = text;
    if (translations && translations[text]) {
      translated = translations[text];
    } else {
      // Fallback: add language indicator for demo
      const targetLangName = languages.find(lang => lang.code === targetLang)?.name;
      translated = `[${targetLangName}] ${text}`;
    }
    
    setTranslatedText(translated);
    
    // Add to recent translations
    const newTranslation = {
      source: text,
      target: translated,
      sourceLang: sourceLang,
      targetLang: targetLang,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setRecentTranslations(prev => [newTranslation, ...prev.slice(0, 4)]);
    setIsTranslating(false);
  };

  // Auto-translate when source text changes
  useEffect(() => {
    if (sourceText.trim()) {
      const debounceTimer = setTimeout(() => {
        translateText(sourceText);
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    } else {
      setTranslatedText('');
    }
  }, [sourceText, sourceLang, targetLang]);

  const handleSwapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  const handlePhraseClick = (phrase) => {
    setSourceText(phrase);
  };

  const getLanguageInfo = (code) => {
    return languages.find(lang => lang.code === code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Languages className="text-blue-600 mr-3" size={40} />
            <h1 className="text-4xl font-bold text-gray-800">Universal Translator</h1>
          </div>
          <p className="text-gray-600 text-lg">Translate between 10 languages instantly with voice support</p>
        </div>

        {/* Enhanced Language Selector with Audio Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mx-6 flex flex-col items-center gap-2">
              <button 
                onClick={handleSwapLanguages}
                className="p-3 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
                title="Swap Languages"
              >
                <ArrowLeftRight size={24} />
              </button>
              
              {/* Global Audio Controls */}
              <div className="flex gap-1">
                <button 
                  onClick={handleStopAudio}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors duration-200"
                  title="Stop All Audio"
                  disabled={!isPlaying.source && !isPlaying.target}
                >
                  <VolumeX size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Audio Status Indicator */}
          <div className="flex items-center justify-center">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              audioSupported 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {audioSupported ? '🎵 Audio & Voice Ready' : '🔇 Audio Not Supported'}
            </div>
          </div>
        </div>

        {/* Translation Interface */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Enhanced Source Text */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getLanguageInfo(sourceLang)?.flag}</span>
                  <h3 className="font-semibold text-gray-800">{getLanguageInfo(sourceLang)?.name}</h3>
                  {isListening && (
                    <div className="ml-3 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                      <span className="text-sm text-red-600 font-medium">Listening...</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {/* Voice Input Button */}
                  <button 
                    onClick={handleVoiceInput}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isListening 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                    } ${!audioSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!audioSupported}
                    title={isListening ? 'Stop Listening' : 'Voice Input'}
                  >
                    {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  
                  {/* Text to Speech Button */}
                  <button 
                    onClick={() => handleSpeak(sourceText, sourceLang, 'source')}
                    disabled={!sourceText || !audioSupported}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isPlaying.source
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={isPlaying.source ? 'Stop Speaking' : 'Speak Text'}
                  >
                    {isPlaying.source ? <Pause size={18} /> : <Volume2 size={18} />}
                  </button>
                  
                  {/* Clear Button */}
                  <button 
                    onClick={handleClear}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-200"
                    title="Clear Text"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate or use voice input..."
                className="w-full h-40 p-4 border-none resize-none focus:outline-none text-lg placeholder-gray-400"
                maxLength={500}
              />
              {isListening && (
                <div className="absolute inset-0 bg-red-50 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 shadow-lg flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping mr-3"></div>
                    <span className="text-gray-700 font-medium">Listening for speech...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {sourceText.length}/500 characters
              </span>
              {audioSupported && (
                <span className="text-xs text-gray-400">
                  💡 Use voice input or text-to-speech
                </span>
              )}
            </div>
          </div>

          {/* Enhanced Translated Text */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getLanguageInfo(targetLang)?.flag}</span>
                  <h3 className="font-semibold text-gray-800">{getLanguageInfo(targetLang)?.name}</h3>
                  {isTranslating && (
                    <div className="ml-3 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce mr-1"></div>
                      <span className="text-sm text-blue-600 font-medium">Translating...</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {/* Play Translation Button */}
                  <button 
                    onClick={() => handleSpeak(translatedText, targetLang, 'target')}
                    disabled={!translatedText || !audioSupported}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      isPlaying.target
                        ? 'bg-green-100 text-green-600'
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={isPlaying.target ? 'Stop Speaking' : 'Speak Translation'}
                  >
                    {isPlaying.target ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  
                  {/* Copy Button */}
                  <button 
                    onClick={() => handleCopy(translatedText)}
                    disabled={!translatedText}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      copied 
                        ? 'bg-green-100 text-green-600' 
                        : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={copied ? 'Copied!' : 'Copy Translation'}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="h-40 p-4 flex items-center justify-center relative">
              {isTranslating ? (
                <div className="flex items-center text-blue-600">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <div>
                    <div className="font-medium">Translating...</div>
                    <div className="text-sm text-gray-500">Processing your text</div>
                  </div>
                </div>
              ) : translatedText ? (
                <div className="w-full">
                  <div className="text-lg text-gray-800 leading-relaxed">{translatedText}</div>
                  {isPlaying.target && (
                    <div className="mt-2 flex items-center text-green-600">
                      <div className="flex space-x-1">
                        <div className="w-1 h-4 bg-green-500 animate-pulse"></div>
                        <div className="w-1 h-6 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-4 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="ml-2 text-sm">Speaking...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <Volume2 size={48} className="mx-auto mb-3 opacity-30" />
                  <div className="font-medium">Translation will appear here</div>
                  <div className="text-sm mt-1">With audio playback ready</div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              {copied ? (
                <span className="text-sm text-green-600 font-medium">
                  ✅ Copied to clipboard!
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  Ready for audio playback
                </span>
              )}
              {translatedText && (
                <span className="text-xs text-gray-400">
                  🔊 Click play to hear pronunciation
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Phrases with Audio */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Common Phrases</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Volume2 size={16} className="mr-1" />
              <span>Click to translate & hear</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {commonPhrases.map((phrase, index) => (
              <button
                key={index}
                onClick={() => handlePhraseClick(phrase)}
                className="group p-4 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{phrase}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {getLanguageInfo(sourceLang)?.flag} → {getLanguageInfo(targetLang)?.flag}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Volume2 size={16} className="text-blue-500" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Recent Translations with Audio */}
        {recentTranslations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Recent Translations</h3>
              <div className="text-sm text-gray-500">
                🎵 Click to replay audio
              </div>
            </div>
            <div className="space-y-3">
              {recentTranslations.map((translation, index) => (
                <div key={index} className="group flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-1">
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span>{getLanguageInfo(translation.sourceLang)?.flag}</span>
                      <ArrowLeftRight size={12} className="mx-2" />
                      <span>{getLanguageInfo(translation.targetLang)?.flag}</span>
                      <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                        {translation.timestamp}
                      </span>
                    </div>
                    <div className="text-gray-800">
                      <span className="font-medium">{translation.source}</span>
                      <span className="mx-2 text-gray-400">→</span>
                      <span className="text-blue-700">{translation.target}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={() => handleSpeak(translation.source, translation.sourceLang)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors duration-200"
                      title="Play Source"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleSpeak(translation.target, translation.targetLang)}
                      className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors duration-200"
                      title="Play Translation"
                    >
                      <Play size={16} />
                    </button>
                    <button 
                      onClick={() => handleCopy(translation.target)}
                      className="p-2 text-gray-400 hover:text-purple-600 rounded-full hover:bg-purple-50 transition-colors duration-200"
                      title="Copy Translation"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Supporting global communication • 10 languages • Voice & Audio Ready</p>
        </div>
      </div>
    </div>
  );
};

export default Translator;