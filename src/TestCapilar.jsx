import React, { useState } from 'react';
import { ChevronRight, User, Users, Droplets, Calendar, AlertTriangle, Zap, Heart, FlaskConical, Scissors } from 'lucide-react';

const TestCapilar = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    gender: '',
    hairType: '',
    routine: '',
    washFrequency: '',
    problems: [],
    dandruffType: '',
    context: '',
    noFixedRule: false,
    noDandruff: false,
    justCare: false
  });

  const steps = [
    'gender', 'hairType', 'routine', 'washFrequency', 
    'problems', 'dandruff', 'context', 'result', 'treatment'
  ];

  const updateResponse = (key, value, isArray = false) => {
    setResponses(prev => {
      if (isArray) {
        const currentArray = prev[key] || [];
        const newArray = currentArray.includes(value) 
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        return { ...prev, [key]: newArray };
      }
      return { ...prev, [key]: value };
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Skip dandruff step if problems don't include dandruff
      if (steps[currentStep] === 'problems' && !responses.problems.includes('caspa')) {
        setCurrentStep(currentStep + 2);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const generateDiagnosis = () => {
    const diagnosis = [];
    
    if (responses.problems.includes('caspa')) {
      diagnosis.push('Caspa voladora + picazón');
    }
    if (responses.problems.includes('caida')) {
      diagnosis.push('Caída activa y debilitamiento');
    }
    if (responses.problems.includes('sequedad')) {
      diagnosis.push('Cuero cabelludo seco');
    }
    if (responses.routine === 'solo-champu') {
      diagnosis.push('Rutina sin tratamientos reales');
    }
    
    return diagnosis.length > 0 ? diagnosis : ['Tu cabello está en buenas condiciones generales'];
  };

  const getStepPath = () => {
    const paths = {
      gender: '',
      hairType: '/test-mujer/cabello',
      routine: '/test-mujer/rutina',
      washFrequency: '/test-mujer/lavado',
      problems: '/test-mujer/molestias',
      dandruff: '/test-mujer/caspa',
      context: '/test-mujer/contexto',
      result: '/test-mujer/resultado',
      treatment: '/test-mujer/tratamiento'
    };
    return paths[steps[currentStep]] || '';
  };

  // Componentes SVG para los íconos de género
  const WomanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        d="M50,28.6c-0.9,0-1.6-0.7-1.6-1.4v-1.4h2c0.2,0,0.2-0.2,0.3-0.4l0,0l0,0l0,0l0.1,0.3c0.1,0.3,0.1,0.2,0.6,0.2v1.3c0,0.3-0.2,0.7-0.4,0.9c0,0.1,0,0.1-0.1,0.1c-0.3,0.3-0.7,0.4-1.1,0.4M54.4,35.2h0c-0.1,0-0.2-0.1-0.2-0.2v-1.8h-0.3c0.1,0.3,0.2,0.6-0.1,1c0,0.1-0.1,0.1-0.1,0.1c-0.1,0.3,0.1,0.8-0.2,0.8s-0.2-0.1-0.2-0.2c0-1,0-0.6,0.2-1c0.3-0.5-0.2-0.9-0.2-1c0-0.3,0.5-0.2,0.9-0.2v-0.3c0-0.4-0.4-0.8-0.8-1c-0.1,0-0.1,0-0.2,0c0,0.2-0.3,0.4-0.5,0.5c-0.5,0.3-1,0.3-1.5,0c-0.2-0.1-0.4-0.3-0.5-0.5c-0.3,0.1-0.5,0.1-0.6,0.3c-0.3,0.3-0.3,0.6-0.3,1h0.7c0.2,0,0.2,0.2,0.1,0.3c-0.5,0.7,0.1,1,0.1,1.2s0.1,0.8-0.2,0.8s-0.2-0.5-0.2-0.8c0-0.1-0.3-0.3-0.3-0.7s0-0.3,0.1-0.6h-0.3v1.8c0,0.1-0.1,0.2-0.2,0.2h-0.1c-0.1,0-0.2-0.1-0.2-0.2v-2.4c0-0.6,0.4-1.1,0.9-1.3c0.3-0.1,0.6-0.1,0.9-0.1c0-0.5,0-0.4-0.2-0.4c-0.1-0.1-0.4-0.2-0.4-0.3c-0.2-0.1-0.1-0.2-0.3-0.3c-0.1-0.1-0.3-0.1-0.4-0.1c-0.4-0.2-0.7-0.6-0.7-1.3v-1.6c0-0.4,0.1-0.7,0.2-1c0.3-0.9,1.2-1.3,2.1-1.3s1.1,0,1.7,0.2c1.1,0.5,0.6,0.9,0.4,0.7c0,0,0,0-0.1-0.1c0,0,0,0-0.1-0.1c-0.6-0.5-1.3-0.4-2.1-0.4s-1.8,0.8-1.8,1.8v1.9c0,0.3,0.2,0.6,0.5,0.8c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.4,0-1.4,0-1.8s0.2-0.2,0.4-0.2h1.9s0.2-0.4,0.2-0.4c0.1-0.1,0.1-0.3,0.3-0.3s0.2,0.2,0.3,0.4c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0.3,0,0.7-0.1,0.7,0.2c0,0.5,0.1,1.7-0.1,2.1c0.1,0,0.3-0.2,0.3-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-1.7c0-0.4-0.1-0.6-0.1-0.7s0.3-0.4,0.4,0.1c0.1,0.4,0.1,1.9,0.1,2.5s-0.4,0.9-0.8,1.1c-0.4,0.2-0.2-0.1-0.5,0.3c0,0-0.1,0.1-0.1,0.1c-0.5,0.5-0.5,0-0.5,0.7c0.5,0,0.8,0,1.2,0.3c0.1,0,0.1,0.1,0.1,0.1c0.2,0.1,0.1,0.1,0.2,0.2c0,0,0.1,0.1,0.1,0.1c0.2,0.3,0.2,0.6,0.2,0.9v2.2c0,0.1-0.1,0.2-0.2,0.2ZM47.5,29.6c0.5,0,0.4,0,0.4-0.6c0.4,0,0.1,0,0.7,0c0,0.2-0.1,0.6,0.1,0.6c0.1,0,0.2,0,0.3,0c-0.3,0.4-1.2,0.5-1.5,0Z"
      />
      <path 
        fill="currentColor" 
        d="M47.6,27.6c0,0.1,0.1,0.2,0.2,0.3c0.3,0.2,0.7,0.1,1-0.1c0.2-0.1,0.1-0.4-0.1-0.4s-0.3,0.4-0.7,0.1c-0.1,0-0.1-0.1-0.2-0.1c-0.1,0-0.2,0.1-0.2,0.2"
      />
    </svg>
  );

  const ManIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full">
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        d="M50,28.6c-0.9,0-1.6-0.7-1.6-1.4v-1.4h2c0.2,0,0.2-0.2,0.3-0.4l0,0l0,0l0,0l0.1,0.3c0.1,0.3,0.1,0.2,0.6,0.2v1.3c0,0.3-0.2,0.7-0.4,0.9c0,0.1,0,0.1-0.1,0.1c-0.3,0.3-0.7,0.4-1.1,0.4M54.4,35.2h0c-0.1,0-0.2-0.1-0.2-0.2v-1.8h-0.3c0.1,0.3,0.2,0.6-0.1,1c0,0.1-0.1,0.1-0.1,0.1c-0.1,0.3,0.1,0.8-0.2,0.8s-0.2-0.1-0.2-0.2c0-1,0-0.6,0.2-1c0.3-0.5-0.2-0.9-0.2-1c0-0.3,0.5-0.2,0.9-0.2v-0.3c0-0.4-0.4-0.8-0.8-1c-0.1,0-0.1,0-0.2,0c0,0.2-0.3,0.4-0.5,0.5c-0.5,0.3-1,0.3-1.5,0c-0.2-0.1-0.4-0.3-0.5-0.5c-0.3,0.1-0.5,0.1-0.6,0.3c-0.3,0.3-0.3,0.6-0.3,1h0.7c0.2,0,0.2,0.2,0.1,0.3c-0.5,0.7,0.1,1,0.1,1.2s0.1,0.8-0.2,0.8s-0.2-0.5-0.2-0.8c0-0.1-0.3-0.3-0.3-0.7s0-0.3,0.1-0.6h-0.3v1.8c0,0.1-0.1,0.2-0.2,0.2h-0.1c-0.1,0-0.2-0.1-0.2-0.2v-2.4c0-0.6,0.4-1.1,0.9-1.3c0.3-0.1,0.6-0.1,0.9-0.1c0-0.5,0-0.4-0.2-0.4c-0.1-0.1-0.4-0.2-0.4-0.3c-0.2-0.1-0.1-0.2-0.3-0.3c-0.1-0.1-0.3-0.1-0.4-0.1c-0.4-0.2-0.7-0.6-0.7-1.3v-1.6c0-0.4,0.1-0.7,0.2-1c0.3-0.9,1.2-1.3,2.1-1.3s1.1,0,1.7,0.2c1.1,0.5,0.6,0.9,0.4,0.7c0,0,0,0-0.1-0.1c0,0,0,0-0.1-0.1c-0.6-0.5-1.3-0.4-2.1-0.4s-1.8,0.8-1.8,1.8v1.9c0,0.3,0.2,0.6,0.5,0.8c0-0.1-0.1-0.2-0.1-0.3c-0.1-0.4,0-1.4,0-1.8s0.2-0.2,0.4-0.2h1.9s0.2-0.4,0.2-0.4c0.1-0.1,0.1-0.3,0.3-0.3s0.2,0.2,0.3,0.4c0,0.1,0.1,0.1,0.1,0.2c0,0.1,0.1,0.1,0.1,0.2c0.3,0,0.7-0.1,0.7,0.2c0,0.5,0.1,1.7-0.1,2.1c0.1,0,0.3-0.2,0.3-0.3c0.1-0.1,0.1-0.3,0.1-0.5v-1.7c0-0.4-0.1-0.6-0.1-0.7s0.3-0.4,0.4,0.1c0.1,0.4,0.1,1.9,0.1,2.5s-0.4,0.9-0.8,1.1c-0.4,0.2-0.2-0.1-0.5,0.3c0,0-0.1,0.1-0.1,0.1c-0.5,0.5-0.5,0-0.5,0.7c0.5,0,0.8,0,1.2,0.3c0.1,0,0.1,0.1,0.1,0.1c0.2,0.1,0.1,0.1,0.2,0.2c0,0,0.1,0.1,0.1,0.1c0.2,0.3,0.2,0.6,0.2,0.9v2.2c0,0.1-0.1,0.2-0.2,0.2ZM47.5,29.6c0.5,0,0.4,0,0.4-0.6c0.4,0,0.1,0,0.7,0c0,0.2-0.1,0.6,0.1,0.6c0.1,0,0.2,0,0.3,0c-0.3,0.4-1.2,0.5-1.5,0Z"
      />
      {/* Diferencias para el hombre: cabello más corto y hombros más anchos */}
      <path 
        fill="currentColor" 
        d="M46,21.5c0,0.1,0.1,0.1,0.2,0.1h7.6c0.1,0,0.2,0,0.2-0.1c0-0.2-0.8-1.2-4-1.2s-4,1-4,1.2"
      />
      {/* Hombros más anchos */}
      <path 
        fill="currentColor" 
        d="M43,30.5c0.2,0.4,0.5,0.8,0.8,1.1c0.1,0.1,0.2,0.1,0.3,0.1h11.8c0.1,0,0.2,0,0.3-0.1c0.3-0.3,0.6-0.7,0.8-1.1c0.1-0.2-0.1-0.4-0.3-0.4H43.3c-0.2,0-0.4,0.2-0.3,0.4"
      />
      {/* Piernas separadas */}
      <rect x="46" y="35" width="2.5" height="8" fill="currentColor"/>
      <rect x="51.5" y="35" width="2.5" height="8" fill="currentColor"/>
    </svg>
  );

  const renderGenderStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Para quién es este diagnóstico capilar personalizado?
      </h2>
      <div className="flex justify-center space-x-8">
        <button
          onClick={() => updateResponse('gender', 'mujer')}
          className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
            responses.gender === 'mujer' 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-purple-300 flex items-center justify-center p-2">
            <WomanIcon />
          </div>
          <span className="font-semibold">Mujer</span>
        </button>
        <button
          onClick={() => updateResponse('gender', 'hombre')}
          className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
            responses.gender === 'hombre' 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-purple-400 flex items-center justify-center p-2">
            <ManIcon />
          </div>
          <span className="font-semibold">Hombre</span>
        </button>
      </div>
    </div>
  );

  const renderHairTypeStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cuál es tu tipo de cabello?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: 'liso', label: 'Liso', pattern: '|||' },
          { key: 'ondulado', label: 'Ondulado', pattern: '~~~' },
          { key: 'rizado', label: 'Rizado', pattern: 'SSS' },
          { key: 'afro', label: 'Afro', pattern: '∞∞∞' }
        ].map(type => (
          <button
            key={type.key}
            onClick={() => updateResponse('hairType', type.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.hairType === type.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <div className="text-2xl font-bold">{type.pattern}</div>
            <span className="font-semibold">{type.label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="checkbox"
          id="changeHair"
          className="rounded border-purple-300"
        />
        <label htmlFor="changeHair" className="text-sm text-gray-600">
          No sé, cambia todo el tiempo
        </label>
      </div>
    </div>
  );

  const renderRoutineStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cómo es tu rutina diaria?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: 'solo-champu', label: 'Solo champú', icon: <Droplets size={24} /> },
          { key: 'champu-acondicionador', label: 'Champú + acondicionador', icon: <Droplets size={24} /> },
          { key: 'tratamiento-completo', label: 'Champú + mascarilla + tratamiento', icon: <Heart size={24} /> },
          { key: 'rutina-mascarillas', label: 'Rutina completa con mascarillas caseras', icon: <FlaskConical size={24} /> }
        ].map(routine => (
          <button
            key={routine.key}
            onClick={() => updateResponse('routine', routine.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.routine === routine.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {routine.icon}
            </div>
            <span className="font-semibold text-center text-sm">{routine.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderWashFrequencyStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cuál es tu frecuencia de lavado?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: 'diario', label: 'Todos los días', icon: <Calendar size={24} /> },
          { key: 'dia-por-medio', label: 'Día por medio', icon: <Calendar size={24} /> },
          { key: '2-3-veces', label: '2 a 3 veces por semana', icon: <Calendar size={24} /> },
          { key: 'cada-10-dias', label: 'Cada 10 días o más', icon: <Calendar size={24} /> }
        ].map(freq => (
          <button
            key={freq.key}
            onClick={() => updateResponse('washFrequency', freq.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.washFrequency === freq.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {freq.icon}
            </div>
            <span className="font-semibold text-center text-sm">{freq.label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="checkbox"
          id="noRule"
          checked={responses.noFixedRule}
          onChange={(e) => updateResponse('noFixedRule', e.target.checked)}
          className="rounded border-purple-300"
        />
        <label htmlFor="noRule" className="text-sm text-gray-600">
          Sin regla fija
        </label>
      </div>
    </div>
  );

  const renderProblemsStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cuál es tu principal molestia capilar?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: 'caida', label: 'Caída excesiva', icon: <AlertTriangle size={24} /> },
          { key: 'sequedad', label: 'Debilidad, puntas abiertas y sequedad', icon: <Zap size={24} /> },
          { key: 'volumen', label: 'Falta de volumen', icon: <Heart size={24} /> },
          { key: 'caspa', label: 'Caspa', icon: <Droplets size={24} /> },
          { key: 'flacidez', label: 'Flacidez', icon: <AlertTriangle size={24} /> },
          { key: 'opaco', label: 'Cabello opaco', icon: <Zap size={24} /> },
          { key: 'blancos', label: 'Blancos sin tinte', icon: <User size={24} /> },
          { key: 'peinar', label: 'Dificultad para peinar', icon: <Scissors size={24} /> }
        ].map(problem => (
          <button
            key={problem.key}
            onClick={() => updateResponse('problems', problem.key, true)}
            className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all ${
              responses.problems.includes(problem.key) 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {problem.icon}
            </div>
            <span className="font-semibold text-center text-xs">{problem.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDandruffStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">Caspa</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { key: 'grumosa', label: 'Caspa grumosa, acné intenso', icon: <AlertTriangle size={24} /> },
          { key: 'fina', label: 'Caspa fina muy visible', icon: <Droplets size={24} /> },
          { key: 'descamacion', label: 'Descamación intensa', icon: <Zap size={24} /> },
          { key: 'enrojecimiento', label: 'Enrojecimiento', icon: <Heart size={24} /> }
        ].map(type => (
          <button
            key={type.key}
            onClick={() => updateResponse('dandruffType', type.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.dandruffType === type.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              {type.icon}
            </div>
            <span className="font-semibold text-center text-sm">{type.label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="checkbox"
          id="noDandruff"
          checked={responses.noDandruff}
          onChange={(e) => updateResponse('noDandruff', e.target.checked)}
          className="rounded border-purple-300"
        />
        <label htmlFor="noDandruff" className="text-sm text-gray-600">
          No tengo caspa (me equivoqué)
        </label>
      </div>
    </div>
  );

  const renderContextStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">Contexto</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { key: 'transicion', label: 'Transición capilar', icon: <ChevronRight size={24} /> },
          { key: 'alisados', label: 'Alisados químicos y decoloración', icon: <Zap size={24} /> },
          { key: 'permanentes', label: 'Permanentes y/o teñido sin químicos', icon: <Droplets size={24} /> },
          { key: 'corte-deportivo', label: 'Corte deportivo', icon: <Scissors size={24} /> },
          { key: 'condicion-medica', label: 'Condición médica (quimios, pastillas)', icon: <Heart size={24} /> }
        ].map(context => (
          <button
            key={context.key}
            onClick={() => updateResponse('context', context.key)}
            className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all ${
              responses.context === context.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {context.icon}
            </div>
            <span className="font-semibold text-center text-xs">{context.label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <input
          type="checkbox"
          id="justCare"
          checked={responses.justCare}
          onChange={(e) => updateResponse('justCare', e.target.checked)}
          className="rounded border-purple-300"
        />
        <label htmlFor="justCare" className="text-sm text-gray-600">
          Solo quiero cuidarlo mejor
        </label>
      </div>
    </div>
  );

  const renderResultStep = () => {
    const diagnosis = generateDiagnosis();
    
    return (
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-center text-gray-800">Resultado</h2>
        <div className="bg-purple-100 rounded-2xl p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              ¡Tu cabello habló!
            </h3>
            <p className="text-purple-700">Esto es lo que nos contó:</p>
          </div>
          <div className="space-y-2">
            {diagnosis.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                <span className="text-purple-800">{item}</span>
              </div>
            ))}
          </div>
          <div className="bg-purple-600 text-white p-4 rounded-xl text-center">
            <p className="font-semibold">
              Necesitas una fórmula que limpie, fortalezca y reactive el crecimiento.
            </p>
          </div>
          <div className="text-center">
            <button 
              onClick={nextStep}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              ¡Tu diagnóstico está listo!
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTreatmentStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Ahora elige cómo quieres recibir tu tratamiento capilar perfecto:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="flex flex-col items-center space-y-4 p-8 bg-purple-200 rounded-2xl hover:bg-purple-300 transition-all">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
            <FlaskConical size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-purple-800">1. Crear mi fórmula personalizada M.O.</h3>
          </div>
        </button>
        <button className="flex flex-col items-center space-y-4 p-8 bg-purple-200 rounded-2xl hover:bg-purple-300 transition-all">
          <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
            <Heart size={32} className="text-white" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-purple-800">2. Elegir un kit ya listo de Indígena o Kambá</h3>
          </div>
        </button>
      </div>
    </div>
  );

  const canContinue = () => {
    const step = steps[currentStep];
    switch (step) {
      case 'gender': return responses.gender !== '';
      case 'hairType': return responses.hairType !== '';
      case 'routine': return responses.routine !== '';
      case 'washFrequency': return responses.washFrequency !== '' || responses.noFixedRule;
      case 'problems': return responses.problems.length > 0;
      case 'dandruff': return responses.dandruffType !== '' || responses.noDandruff;
      case 'context': return responses.context !== '' || responses.justCare;
      default: return true;
    }
  };

  const renderCurrentStep = () => {
    const step = steps[currentStep];
    switch (step) {
      case 'gender': return renderGenderStep();
      case 'hairType': return renderHairTypeStep();
      case 'routine': return renderRoutineStep();
      case 'washFrequency': return renderWashFrequencyStep();
      case 'problems': return renderProblemsStep();
      case 'dandruff': return renderDandruffStep();
      case 'context': return renderContextStep();
      case 'result': return renderResultStep();
      case 'treatment': return renderTreatmentStep();
      default: return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4 rounded-t-3xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">Test Capilar</h1>
          {getStepPath() && (
            <span className="text-sm opacity-80">{getStepPath()}</span>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-b-3xl min-h-96">
          {renderCurrentStep()}
          
          {/* Continue Button */}
          {steps[currentStep] !== 'result' && steps[currentStep] !== 'treatment' && (
            <div className="flex justify-center mt-8">
              <button
                onClick={nextStep}
                disabled={!canContinue()}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all flex items-center space-x-2 ${
                  canContinue()
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Continuar</span>
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 flex justify-center space-x-2">
          {steps.slice(0, -1).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index <= currentStep ? 'bg-white' : 'bg-purple-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCapilar;