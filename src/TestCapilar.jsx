import React, { useState } from 'react';
import { ChevronRight, User, Users, Droplets, Calendar, AlertTriangle, Zap, Heart, FlaskConical, Scissors, Star } from 'lucide-react';

const TestCapilar = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    gender: '',
    // Mujer
    hairType: '',
    routine: '',
    washFrequency: '',
    problems: [],
    priorities: { primary: '', secondary: '' },
    dandruffType: '',
    context: '',
    objective: '',
    priorityLevel: '',
    // Hombre
    hairLossTime: '',
    hairLossCauses: '',
    alopeciaStatus: '',
    // Comunes
    noDandruff: false,
    customObjective: ''
  });

  const womenSteps = [
    'gender',        // 0
    'hairType',      // 1  
    'routine',       // 2
    'washFrequency', // 3
    'problems',      // 4
    'priorities',    // 5 <- Aquí debería saltar si no hay caspa
    'dandruff',      // 6 <- Esta es la pantalla que se debe saltar
    'context',       // 7
    'objective',     // 8
    'priorityLevel', // 9
    'result',        // 10
    'treatment'      // 11
  ];

  const menSteps = [
    'gender', 'hairLossTime', 'problems', 'washFrequency', 
    'hairLossCauses', 'alopecia', 'routine', 'objective', 'priorityLevel', 'result', 'treatment'
  ];

  const getCurrentSteps = () => {
    return responses.gender === 'mujer' ? womenSteps : menSteps;
  };

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
    const steps = getCurrentSteps();
    if (currentStep < steps.length - 1) {
      
      // LÓGICA ESPECIAL: Saltar caspa si no la seleccionaron
      if (steps[currentStep] === 'problems' && responses.gender === 'mujer') {
        if (!responses.problems.includes('caspa')) {
          // Encontrar el índice de 'context' para saltar allí directamente
          const contextIndex = steps.indexOf('context');
          setCurrentStep(contextIndex);
          return; // SALIR AQUÍ - No ejecutar el código de abajo
        }
      }
      
      // LÓGICA ESPECIAL: Saltar dandruff desde priorities si no hay caspa
      if (steps[currentStep] === 'priorities' && responses.gender === 'mujer') {
        if (!responses.problems.includes('caspa')) {
          const contextIndex = steps.indexOf('context');
          setCurrentStep(contextIndex);
          return;
        }
      }
      
      // Continuar normalmente
      setCurrentStep(currentStep + 1);
    }
  };

  const generatePersonalizedFormula = () => {
    const problems = responses.problems;
    const hairType = responses.hairType;
    const objective = responses.objective;
    const context = responses.context;
    const primaryProblem = responses.priorities?.primary;
    
    // Mapeo de tipos de cabello
    const hairTypeMap = {
      'liso': 'LISOS',
      'ondulado': 'ONDULADO', 
      'rizado': 'RIZADO',
      'afro': 'AFRO',
      'cambia': 'NO SÉ'
    };
    
    // Mapeo de problemas según el Excel
    const problemMap = {
      'caida-excesiva': 'Caída del cabello',
      'frizz-persistente': 'Frizz',
      'debilidad': 'Puntas abiertas o hebra frágil',
      'cabello-opaco': 'Opacidad (sin brillo)',
      'caspa': 'Caspa',
      'rizos-sin-forma': 'Falta de definición',
      'sensibilidad': 'Cuero cabelludo sensible o picazón',
      'dificultad-peinar': 'Cabello rebelde / difícil de peinar'
    };
    
    // Base de datos de recomendaciones según Excel
    const recommendations = {
      'LISOS': {
        'Caída del cabello': {
          shampoo: 'Shot Control & Suavidad',
          mascarilla: 'Shot Raíz Firme',
          kit: '💪 Rutina Fortalecedora Kamala',
          code: 'li_ca',
          description: 'Te recomendamos este tratamiento para manejar la caída en tu cabello liso.',
          note: 'Ajustar si hay estrés, posparto o condición médica'
        },
        'Frizz': {
          shampoo: 'Shot AntiFrizz Ligero',
          mascarilla: 'Shot Liso Perfecto', 
          kit: '🌬 Rutina Anti-Frizz Natural',
          code: 'li_fr',
          description: 'El frizz en cabello liso se controla mejor con esta rutina ligera y sellante.',
          note: 'Ajustar si hay tintes o daño químico'
        },
        'Puntas abiertas o hebra frágil': {
          shampoo: 'Shot Hebra Firme',
          mascarilla: 'Plátano Shot Suave Tropical',
          kit: '✂️ Rutina Repara y Sella',
          code: 'li_pu', 
          description: 'Puntas más sanas y fuertes con esta combinación para cabellos lisos.',
          note: 'Reforzar nutrición si hay decoloración o resequedad extrema'
        },
        'Opacidad (sin brillo)': {
          shampoo: 'Shot Brillo Refrescante',
          mascarilla: 'Shot Brillo Nutritivo',
          kit: '✨ Rutina Brillo Vivo',
          code: 'li_op',
          description: 'Devolvemos la luz natural de tu cabello con esta fórmula para lisos.',
          note: 'Potenciar con serum iluminador si hay estrés o desnutrición capilar'
        },
        'Caspa': {
          shampoo: 'Shot Anticaída Suave',
          mascarilla: 'Shot Calm Control',
          kit: '❄️ Rutina Detox Scalp Clean',
          code: 'li_ca2',
          description: 'Cuida tu cuero cabelludo y controla la caspa en cabello liso sin resecar.',
          note: 'Ajustar si es caspa gruesa o emocional'
        },
        'Falta de definición': {
          shampoo: 'Shot Liso con Cuerpo',
          mascarilla: 'Shot Rizo Vivo',
          kit: '💫 Rutina Define sin Frizz',
          code: 'li_fd',
          description: 'Dale estructura y forma natural a tu liso con esta rutina sin químicos agresivos.',
          note: 'Si hay alisados, reducir peso de los productos'
        },
        'Cuero cabelludo sensible o picazón': {
          shampoo: 'Shot Calm & Repair',
          mascarilla: 'Shot Calmante Profundo',
          kit: '🌿 Rutina Calmante Natural',
          code: 'li_sen',
          description: 'Una rutina gentil que respeta tu cuero cabelludo y restaura tu cabello liso.',
          note: 'Suavizar y calmar si hay caspa o alergia'
        },
        'Cabello rebelde / difícil de peinar': {
          shampoo: 'Shot Suavidad Total',
          mascarilla: 'Shot Restauración Profunda',
          kit: '🎯 Rutina Control y Suavidad',
          code: 'li_reb',
          description: 'Domina y controla tu liso sin apelmazarlo ni saturarlo.',
          note: 'Usar activos suavizantes y controladores'
        }
      },
      'ONDULADO': {
        'Caída del cabello': {
          shampoo: 'Shot Control & Suavidad',
          mascarilla: 'Shot Raíz Firme',
          kit: '💪 Rutina Fuerza Ondulada',
          code: 'on_ca',
          description: 'Fortalece desde la raíz y detén la caída en tu cabello ondulado.',
          note: 'Ajustar si hay estrés, posparto o condición médica'
        },
        'Frizz': {
          shampoo: 'Shot AntiFrizz Ligero',
          mascarilla: 'Shot Liso Perfecto',
          kit: '🌬 Rutina Ondas Sin Frizz',
          code: 'on_fr',
          description: 'Elimina el frizz sin quitarle movimiento ni ligereza a tus ondas.',
          note: 'Reforzar si hubo procesos químicos como tintes o alisados'
        },
        'Puntas abiertas o hebra frágil': {
          shampoo: 'Shot Hebra Firme',
          mascarilla: 'Shot Suave Tropical',
          kit: '✂️ Rutina Sellado Nutritivo',
          code: 'on_pu',
          description: 'Sella y fortalece tus puntas sin apelmazar tus ondas.',
          note: 'Nutrición intensa si hay sol o calor frecuente'
        },
        'Opacidad (sin brillo)': {
          shampoo: 'Shot Brillo Refrescante',
          mascarilla: 'Shot Brillo Nutritivo',
          kit: '✨ Rutina Brillo Natural',
          code: 'on_op',
          description: 'Devuelve el brillo natural y saludable a tus ondas.',
          note: 'Añadir gotas iluminadoras si hay cabello teñido'
        },
        'Caspa': {
          shampoo: 'Shot Anticaída Suave',
          mascarilla: 'Shot Calm Control',
          kit: '❄️ Rutina Detox Anti-Caspa',
          code: 'on_ca2',
          description: 'Equilibrio para tu cuero cabelludo sin resecar tus ondas.',
          note: 'Suavizar si es emocional o alérgica'
        },
        'Falta de definición': {
          shampoo: 'Shot Liso con Cuerpo',
          mascarilla: 'Shot Rizo Vivo',
          kit: '💫 Rutina Ondas Definidas',
          code: 'on_fd',
          description: 'Define y realza tus ondas de forma natural y sin peso.',
          note: 'Activadores ligeros si hay mucho volumen'
        },
        'Cuero cabelludo sensible o picazón': {
          shampoo: 'Shot Calm & Repair',
          mascarilla: 'Shot Calmante Profundo',
          kit: '🌿 Rutina Cuero Cabelludo Zen',
          code: 'on_sen',
          description: 'Calma el cuero cabelludo y mejora la salud de tu cabello ondulado.',
          note: 'Utilizar shampoo calmante sin sulfatos'
        },
        'Cabello rebelde / difícil de peinar': {
          shampoo: 'Shot Suavidad Total',
          mascarilla: 'Shot Restauración Profunda',
          kit: '🎯 Rutina Ondas Controladas',
          code: 'on_reb',
          description: 'Domina tus ondas con esta rutina que facilita el peinado y controla el frizz.',
          note: 'Sugerir peinados protectores o activadores moldeables'
        }
      },
      'RIZADO': {
        'Caída del cabello': {
          shampoo: 'Shot Control & Suavidad',
          mascarilla: 'Shot Raíz Firme',
          kit: '💪 Rutina Rizo Fuerte Kamala',
          code: 'ri_ca',
          description: 'Fortalece tus raíces y activa el crecimiento natural en rizos.',
          note: 'Fortalecimiento intensivo si hay posparto o estrés hormonal'
        },
        'Frizz': {
          shampoo: 'Shot AntiFrizz Ligero',
          mascarilla: 'Shot Liso Perfecto',
          kit: '🌬 Rutina Rizo Libre de Frizz',
          code: 'ri_fr',
          description: 'Rizos sin frizz, definidos y suaves, sin perder su volumen natural.',
          note: 'Potenciar con crema definidora si hay alta porosidad'
        },
        'Puntas abiertas o hebra frágil': {
          shampoo: 'Shot Hebra Firme',
          mascarilla: 'Shot Suave Tropical',
          kit: '✂️ Rutina Nutrir y Cerrar Rizo',
          code: 'ri_pu',
          description: 'Repara tu hebra sin perder definición ni forma.',
          note: 'Añadir sellador o crema rica si hay resequedad extrema'
        },
        'Opacidad (sin brillo)': {
          shampoo: 'Shot Brillo Refrescante',
          mascarilla: 'Shot Brillo Nutritivo',
          kit: '✨ Rutina Rizo con Brillo',
          code: 'ri_op',
          description: 'Rizos llenos de vida y brillo con esta rutina revitalizante.',
          note: 'Iluminar con gotas nutritivas si hay coloración'
        },
        'Caspa': {
          shampoo: 'Shot Anticaída Suave',
          mascarilla: 'Shot Calm Control',
          kit: '❄️ Rutina Rizo Detox Anticaspa',
          code: 'ri_ca2',
          description: 'Equilibra tu cuero cabelludo y cuida tus rizos desde la raíz.',
          note: 'Usar shampoo suave y tónico calmante si hay cuero muy seco'
        },
        'Falta de definición': {
          shampoo: 'Shot Definición Natural',
          mascarilla: 'Shot Rizo Vivo',
          kit: '💫 Rutina Rizos Definidos',
          code: 'ri_fd',
          description: 'Potencia la forma de tus rizos con esta rutina que los define sin apelmazar.',
          note: 'Añadir activador si hay rizos flojos o sin forma'
        },
        'Cuero cabelludo sensible o picazón': {
          shampoo: 'Shot Calm & Repair',
          mascarilla: 'Shot Calmante Profundo',
          kit: '🌿 Rutina Cuero Cabelludo Rizado Zen',
          code: 'ri_sen',
          description: 'Cuida tu cuero cabelludo con una rutina libre de irritantes.',
          note: 'Enfocado en limpieza suave y alivio del picor'
        },
        'Cabello rebelde / difícil de peinar': {
          shampoo: 'Shot Suavidad Total',
          mascarilla: 'Shot Restauración Profunda',
          kit: '🎯 Rutina Rizo Bajo Control',
          code: 'ri_reb',
          description: 'Facilita el manejo de tus rizos con esta rutina que desenreda y define.',
          note: 'Reforzar con crema antifrizz o mantequilla modeladora'
        }
      },
      'AFRO': {
        'Caída del cabello': {
          shampoo: 'Shot Control & Suavidad',
          mascarilla: 'Shot Raíz Firme',
          kit: '💪 Rutina Afro Power Kamala',
          code: 'af_ca',
          description: 'Refuerza la raíz, activa el crecimiento y reduce la caída en tu afro.',
          note: 'Ajustar con fortalecedor y masajeador si hay posparto'
        },
        'Frizz': {
          shampoo: 'Shot AntiFrizz Ligero',
          mascarilla: 'Shot Liso Perfecto',
          kit: '🌬 Rutina Afro Control Total',
          code: 'af_fr',
          description: 'Domina el frizz con hidratación profunda sin perder textura.',
          note: 'Agregar mantequilla capilar y crema antifrizz'
        },
        'Puntas abiertas o hebra frágil': {
          shampoo: 'Shot Hebra Firme',
          mascarilla: 'Shot Suave Tropical',
          kit: '✂️ Rutina Sella Afro Pro',
          code: 'af_pu',
          description: 'Nutre y repara las puntas sin apelmazar tu afro.',
          note: 'Usar aceite nutritivo y mascarilla densa'
        },
        'Opacidad (sin brillo)': {
          shampoo: 'Shot Brillo Refrescante',
          mascarilla: 'Shot Brillo Nutritivo',
          kit: '✨ Rutina Afro Brillante',
          code: 'af_op',
          description: 'Restaura el brillo natural de tu afro con esta rutina revitalizante.',
          note: 'Añadir gotas iluminadoras o serum oleoso'
        },
        'Caspa': {
          shampoo: 'Shot Anticaída Suave',
          mascarilla: 'Shot Calm Control',
          kit: '❄️ Rutina Scalp Detox Afro',
          code: 'af_ca2',
          description: 'Limpieza profunda y alivio para tu cuero cabelludo sensible.',
          note: 'Usar shampoo calmante y tónico herbal'
        },
        'Falta de definición': {
          shampoo: 'Shot Definición Natural',
          mascarilla: 'Shot Rizo Vivo',
          kit: '💫 Rutina Afro Definido y Natural',
          code: 'af_fd',
          description: 'Define y moldea tu afro con productos que respetan su forma natural.',
          note: 'Potenciar con crema texturizante o activador de rizos densos'
        },
        'Cuero cabelludo sensible o picazón': {
          shampoo: 'Shot Calm & Repair',
          mascarilla: 'Shot Calmante Profundo',
          kit: '🌿 Rutina Afro Cuero Cabelludo Zen',
          code: 'af_sen',
          description: 'Calma la irritación sin comprometer la hidratación y nutrición de tu afro.',
          note: 'Suavizar fórmulas, usar brumas refrescantes'
        },
        'Cabello rebelde / difícil de peinar': {
          shampoo: 'Shot Suavidad Total',
          mascarilla: 'Shot Restauración Profunda',
          kit: '🎯 Rutina Afro Domina tu Textura',
          code: 'af_reb',
          description: 'Facilita el peinado sin romper ni maltratar tu afro.',
          note: 'Añadir crema peinadora + sérum desenredante'
        }
      },
      'NO SÉ': {
        'Caída del cabello': {
          shampoo: 'Shot Control & Suavidad',
          mascarilla: 'Shot Raíz Firme',
          kit: '💪 Rutina Fuerza Universal Kamala',
          code: 'ns_ca',
          description: 'Este kit actúa desde la raíz y te ayuda a detener la caída aunque no sepas tu tipo.',
          note: 'Reforzar si hay posparto o estrés crónico'
        },
        'Frizz': {
          shampoo: 'Shot AntiFrizz Ligero',
          mascarilla: 'Shot Liso Perfecto',
          kit: '🌬 Rutina Sin Frizz para Todos',
          code: 'ns_fr',
          description: 'Controla el frizz sin importar si hoy tu cabello está liso o se ondula.',
          note: 'Incluir sérum liviano y sellador sin peso'
        },
        'Puntas abiertas o hebra frágil': {
          shampoo: 'Shot Hebra Firme',
          mascarilla: 'Shot Suave Tropical',
          kit: '✂️ Rutina Nutre y Sella Express',
          code: 'ns_pu',
          description: 'Nutrición puntual que se adapta sin importar la textura de tu cabello.',
          note: 'Suplementar con gotero nutritivo si hay tintes'
        },
        'Opacidad (sin brillo)': {
          shampoo: 'Shot Brillo Refrescante',
          mascarilla: 'Shot Brillo Nutritivo',
          kit: '✨ Rutina Brillo Real',
          code: 'ns_op',
          description: 'Devuelve el brillo natural con esta rutina adaptable a todo tipo de textura.',
          note: 'Añadir gotas iluminadoras universales'
        },
        'Caspa': {
          shampoo: 'Shot Anticaída Suave',
          mascarilla: 'Shot Calm Control',
          kit: '❄️ Rutina Detox Anticaspa Total',
          code: 'ns_ca2',
          description: 'Rutina equilibrada para cuero cabelludo con caspa, sin importar tu textura.',
          note: 'Aplicar shampoo neutro + tónico herbal'
        },
        'Falta de definición': {
          shampoo: 'Shot Definición Natural',
          mascarilla: 'Shot Rizo Vivo',
          kit: '💫 Rutina Descubre tu Forma',
          code: 'ns_fd',
          description: 'Realza lo mejor de tu forma natural con esta fórmula versátil y sin peso.',
          note: 'Usar activador suave + finalizador liviano'
        },
        'Cuero cabelludo sensible o picazón': {
          shampoo: 'Shot Calm & Repair',
          mascarilla: 'Shot Calmante Profundo',
          kit: '🌿 Rutina Cuero Cabelludo Calma Total',
          code: 'ns_sen',
          description: 'Calma el cuero cabelludo sin interferir con el comportamiento cambiante de tu pelo.',
          note: 'Enfocado en shampoo calmante y bruma refrescante'
        },
        'Cabello rebelde / difícil de peinar': {
          shampoo: 'Shot Suavidad Total',
          mascarilla: 'Shot Restauración Profunda',
          kit: '🎯 Rutina Control Fácil',
          code: 'ns_reb',
          description: 'Maneja tu cabello sin importar si es liso, ondulado o cambia constantemente.',
          note: 'Añadir crema moldeadora + cepillo flexible recomendado'
        }
      }
    };
    
    // Obtener tipo de cabello normalizado
    const normalizedHairType = hairTypeMap[hairType] || 'NO SÉ';
    
    // Obtener problema principal normalizado
    let normalizedProblem = problemMap[primaryProblem] || primaryProblem;
    if (!normalizedProblem && problems.length > 0) {
      normalizedProblem = problemMap[problems[0]] || 'Rutina básica / no sabe';
    }
    
    // Buscar recomendación específica
    const hairTypeRecommendations = recommendations[normalizedHairType] || recommendations['NO SÉ'];
    let recommendation = hairTypeRecommendations[normalizedProblem];
    
    // Si no encuentra recomendación específica, usar rutina básica
    if (!recommendation) {
      recommendation = hairTypeRecommendations['Rutina básica / no sabe'] || {
        shampoo: 'Shot Equilibrio Diario',
        mascarilla: 'Shot Nutrición Balanceada',
        kit: '🌱 Rutina Esencial Salopém',
        code: 'gen_bas',
        description: 'Esta rutina es ideal para empezar a cuidar tu cabello.',
        note: 'Recomendación de entrada sin complejidad'
      };
    }
    
    // Aromas según género
    const aromas = responses.gender === 'mujer' ? [
      'TROPIC (Frutal exótico)',
      'NAEA (Fresco caribeño)', 
      'VANA (Dulce coqueto)'
    ] : [
      'TERRA (Amaderado fresco)',
      'VENTO (Fresco vigoroso)'
    ];
    
    // Ajustar según contexto especial
    let specialNote = recommendation.note;
    if (context === 'alisados-tintes' && specialNote.includes('tintes')) {
      specialNote = `${specialNote} - APLICADO: Reforzar por químicos recientes`;
    }
    if (context === 'condicion-medica' && specialNote.includes('posparto')) {
      specialNote = `${specialNote} - APLICADO: Ajustado por condición médica`;
    }
    if (context === 'estres-excesivo' && specialNote.includes('estrés')) {
      specialNote = `${specialNote} - APLICADO: Reforzado por estrés`;
    }
    
    return {
      base: {
        shampoo: 'Mi Shampoo Base MIO',
        mascarilla: hairType !== 'liso' || problems.includes('debilidad') || problems.includes('puntas-abiertas')
      },
      drops: {
        shampoo: recommendation.shampoo,
        mascarilla: recommendation.mascarilla
      },
      aromas,
      kit: recommendation.kit,
      code: recommendation.code,
      description: recommendation.description,
      note: specialNote,
      price: 28000 // Base + 2 drops aproximadamente
    };
  };

  const getAlternativeKit = () => {
    const problems = responses.problems;
    const objective = responses.objective;
    
    if (problems.includes('caida-excesiva') || objective === 'frenar-caida') {
      return {
        name: 'Kit Anticaída KAMALA',
        description: 'Shampoo + Acondicionador + Tónico + Mascarilla Pre-Shampoo',
        price: 141000
      };
    }
    
    if (problems.includes('caspa') || objective === 'tratar-caspa') {
      return {
        name: 'Kit Anticaspa SALOPÉM',
        description: 'Shampoo anticaspa + Acondicionador detox + Tónico anticaída',
        price: 107000
      };
    }
    
    if (problems.includes('debilidad') || problems.includes('frizz-persistente') || objective === 'hidratar') {
      return {
        name: 'Kit Hidratación Intensiva SALOPÉM',
        description: 'Shampoo + Acondicionador + Crema para peinar + Mascarilla',
        price: 131000
      };
    }
    
    return {
      name: 'Kit Regenerador KAMALA',
      description: 'Shampoo + Acondicionador + Mascarilla regeneradora',
      price: 109000
    };
  };

  const renderGenderStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cómo deseas personalizar tu diagnóstico capilar?
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
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center p-2">
            <img 
              src="https://www.factoryim.co/assets/WomanIcon.png" 
              alt="Mujer" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.log("Error loading WomanIcon.png");
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              onLoad={() => console.log("WomanIcon.png loaded successfully")}
              style={{ filter: responses.gender === 'mujer' ? 'brightness(0) invert(1)' : 'none' }}
            />
            <svg 
              style={{ display: 'none' }} 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-8 h-8"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5L13.5 7.2C13.1 7.1 12.7 7 12.4 7H11.6C11.3 7 10.9 7.1 10.5 7.2L9 7.5L3 7V9L9 8.5V12.5L3 13V15L9 14.5V22H11V14.5L13 14.5V22H15V14.5L21 15V13L15 12.5V8.5L21 9Z"/>
            </svg>
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
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center p-2">
            <img 
              src="https://www.factoryim.co/assets/ManIcon.png" 
              alt="Hombre" 
              className="w-full h-full object-contain"
              onError={(e) => {
                console.log("Error loading ManIcon.png");
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
              onLoad={() => console.log("ManIcon.png loaded successfully")}
              style={{ filter: responses.gender === 'hombre' ? 'brightness(0) invert(1)' : 'none' }}
            />
            <svg 
              style={{ display: 'none' }} 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-8 h-8"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM8 7H16L15 8.5V12.5L21 13V15L15 14.5V22H13V14.5H11V22H9V14.5L3 15V13L9 12.5V8.5L8 7Z"/>
            </svg>
          </div>
          <span className="font-semibold">Hombre</span>
        </button>
      </div>
    </div>
  );

  // PANTALLAS PARA MUJERES
  const renderHairTypeStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cómo describirías tu tipo de cabello?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { key: 'liso', label: 'Liso' },
          { key: 'ondulado', label: 'Ondulado' },
          { key: 'rizado', label: 'Rizado' },
          { key: 'afro', label: 'Afro' },
          { key: 'cambia', label: 'No sé, cambia todo el tiempo' }
        ].map(type => (
          <button
            key={type.key}
            onClick={() => updateResponse('hairType', type.key)}
            className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all ${
              responses.hairType === type.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center text-sm">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderRoutineStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Qué usas actualmente en tu rutina capilar?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'solo-shampoo', label: 'Solo shampoo' },
          { key: 'shampoo-acondicionador', label: 'Shampoo y acondicionador' },
          { key: 'shampoo-mascarillas', label: 'Shampoo + mascarillas o tratamientos' },
          { key: 'productos-caseros', label: 'Tónicos, aceites o mascarillas caseras' }
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
            <span className="font-semibold text-center">{routine.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderWashFrequencyStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Con qué frecuencia lavas tu cabello?
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { key: 'diario', label: 'Todos los días' },
          { key: 'dia-por-medio', label: 'Día de por medio' },
          { key: '2-3-veces', label: '2 a 3 veces por semana' },
          { key: '1-vez-semana', label: '1 vez por semana' },
          { key: 'cada-10-dias', label: 'Cada 10 días o más' },
          { key: 'sin-regla', label: 'Sin regla fija' }
        ].map(freq => (
          <button
            key={freq.key}
            onClick={() => updateResponse('washFrequency', freq.key)}
            className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all ${
              responses.washFrequency === freq.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center text-sm">{freq.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderProblemsStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cuáles de estas molestias tienes actualmente?
      </h2>
      <p className="text-center text-gray-600 text-sm">(Puedes seleccionar varias)</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { key: 'caida-excesiva', label: 'Caída excesiva' },
          { key: 'debilidad', label: 'Debilidad, puntas abiertas y quiebre' },
          { key: 'frizz-persistente', label: 'Frizz persistente' },
          { key: 'caspa', label: 'Caspa' },
          { key: 'picazon', label: 'Picazón' },
          { key: 'cabello-opaco', label: 'Cabello opaco' },
          { key: 'rizos-sin-forma', label: 'Rizos sin forma' },
          { key: 'dificultad-peinar', label: 'Dificultad para peinar' },
          { key: 'exceso-grasa', label: 'Exceso de grasa' },
          { key: 'sensibilidad', label: 'Sensibilidad o irritación' }
        ].map(problem => (
          <button
            key={problem.key}
            onClick={() => updateResponse('problems', problem.key, true)}
            className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-all ${
              responses.problems.includes(problem.key) 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center text-xs">{problem.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPrioritiesStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        De lo que seleccionaste antes, ¿qué es lo que más te preocupa?
      </h2>
      <p className="text-center text-gray-600 text-sm">¿Qué sería lo segundo que quisieras mejorar?</p>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-purple-800 mb-3">Prioridad 1 (más importante):</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {responses.problems.map(problem => (
              <button
                key={problem}
                onClick={() => updateResponse('priorities', { 
                  ...responses.priorities, 
                  primary: problem 
                })}
                className={`p-3 rounded-xl transition-all ${
                  responses.priorities?.primary === problem 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                }`}
              >
                <span className="text-xs font-semibold">
                  {problem.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-purple-800 mb-3">Prioridad 2 (segunda importancia):</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {responses.problems.filter(p => p !== responses.priorities?.primary).map(problem => (
              <button
                key={problem}
                onClick={() => updateResponse('priorities', { 
                  ...responses.priorities, 
                  secondary: problem 
                })}
                className={`p-3 rounded-xl transition-all ${
                  responses.priorities?.secondary === problem 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                }`}
              >
                <span className="text-xs font-semibold">
                  {problem.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDandruffStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">Cuéntanos más sobre tu caspa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'gruesa', label: 'Caspa gruesa, como masita' },
          { key: 'fina', label: 'Caspa fina que vuela' },
          { key: 'picazon-intensa', label: 'Picazón intensa' },
          { key: 'enrojecimiento', label: 'Enrojecimiento' },
          { key: 'no-tengo', label: 'No tengo caspa (me equivoqué)' }
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
            <span className="font-semibold text-center">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContextStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Cuál es tu contexto capilar actual?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'transicion-capilar', label: 'Transición capilar (dejando tintes o químicos)' },
          { key: 'alisados-tintes', label: 'Alisados, tintes y decoloración recientes' },
          { key: 'calor-brushing', label: 'Planchado y cepillado regular (uso de calor)' },
          { key: 'estres-excesivo', label: 'Estrés excesivo (laboral, emocional)' },
          { key: 'condicion-medica', label: 'Condición médica (tiroides, posparto, etc.)' },
          { key: 'solo-cuidar', label: 'Solo quiero cuidarlo mejor y prevenir daños' }
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
            <span className="font-semibold text-center text-sm">{context.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderObjectiveStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Qué es lo primero que quieres lograr con tu cabello?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'frenar-caida', label: 'Frenar la caída (evitar que siga cayéndose)' },
          { key: 'crecimiento', label: 'Lograr crecimiento (cabello nuevo y largo)' },
          { key: 'brillo', label: 'Devolver brillo (saludable y con luz natural)' },
          { key: 'eliminar-frizz', label: 'Eliminar frizz (suave y manejable)' },
          { key: 'definir-rizos', label: 'Definir rizos (ondas marcadas sin frizz)' },
          { key: 'tratar-caspa', label: 'Tratar la caspa (reducir escamas)' },
          { key: 'hidratar', label: 'Hidratarlo (que no esté seco)' },
          { key: 'fortalecer', label: 'Fortalecerlo (más grueso y resistente)' }
        ].map(obj => (
          <button
            key={obj.key}
            onClick={() => updateResponse('objective', obj.key)}
            className={`flex flex-col items-center space-y-3 p-4 rounded-2xl transition-all ${
              responses.objective === obj.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center text-sm">{obj.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Otro (especifica):
        </label>
        <input
          type="text"
          value={responses.customObjective}
          onChange={(e) => updateResponse('customObjective', e.target.value)}
          placeholder="Describe tu objetivo específico..."
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderPriorityLevelStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Qué tan importante es este objetivo para ti?
      </h2>
      <p className="text-center text-gray-600">Marca según tu nivel de prioridad:</p>
      
      <div className="space-y-4">
        {[
          { key: '1', label: 'Es mi prioridad máxima (lo quiero solucionar ya)', stars: '⭐⭐⭐' },
          { key: '2', label: 'Es importante, pero puede esperar un poco', stars: '⭐⭐' },
          { key: '3', label: 'Solo quiero mejorarlo gradualmente', stars: '⭐' }
        ].map(level => (
          <button
            key={level.key}
            onClick={() => updateResponse('priorityLevel', level.key)}
            className={`w-full flex items-center space-x-4 p-6 rounded-2xl transition-all ${
              responses.priorityLevel === level.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="text-2xl">{level.stars}</span>
            <div className="text-left">
              <span className="font-bold">{level.key}:</span>
              <span className="ml-2">{level.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // PANTALLAS PARA HOMBRES
  const renderHairLossTimeStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Desde cuándo notas caída de cabello?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'meses', label: 'Hace unos meses' },
          { key: '1-2-años', label: 'Desde hace 1 o 2 años' },
          { key: 'joven', label: 'Desde joven' },
          { key: 'no-tengo', label: 'No tengo caída' }
        ].map(time => (
          <button
            key={time.key}
            onClick={() => updateResponse('hairLossTime', time.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.hairLossTime === time.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center">{time.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderHairLossCausesStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Qué crees que podría estar causando tu caída?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'gorra', label: 'Uso frecuente de gorra' },
          { key: 'sol', label: 'Exposición solar' },
          { key: 'falta-cuidado', label: 'Falta de cuidado' },
          { key: 'estres-alimentacion', label: 'Estrés o cambios en alimentación' },
          { key: 'genetica', label: 'Genética' },
          { key: 'no-se', label: 'No lo sé' }
        ].map(cause => (
          <button
            key={cause.key}
            onClick={() => updateResponse('hairLossCauses', cause.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.hairLossCauses === cause.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center">{cause.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderAlopeciaStep = () => (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        ¿Tienes diagnóstico o sospechas de alopecia?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'confirmado', label: 'Diagnóstico confirmado' },
          { key: 'sospecha', label: 'Sospecha sin confirmar' },
          { key: 'no-creo', label: 'No lo creo' },
          { key: 'no-caida', label: 'No tengo caída' }
        ].map(status => (
          <button
            key={status.key}
            onClick={() => updateResponse('alopeciaStatus', status.key)}
            className={`flex flex-col items-center space-y-3 p-6 rounded-2xl transition-all ${
              responses.alopeciaStatus === status.key 
                ? 'bg-purple-600 text-white' 
                : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
            }`}
          >
            <span className="font-semibold text-center">{status.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderResultStep = () => {
    const formula = generatePersonalizedFormula();
    
    return (
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Tu Diagnóstico Personalizado
        </h2>
        
        <div className="bg-purple-100 rounded-2xl p-6 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              🎯 Resultado de tu Test Capilar
            </h3>
            <div className="bg-white rounded-xl p-4 inline-block">
              <span className="text-purple-600 font-semibold">Código: {formula.code}</span>
            </div>
          </div>
          
          {responses.gender === 'mujer' && (
            <div className="grid grid-cols-2 gap-4 text-sm bg-white rounded-xl p-4">
              <div><strong>Tipo de cabello:</strong> {responses.hairType}</div>
              <div><strong>Problema principal:</strong> {responses.priorities?.primary}</div>
              <div><strong>Contexto:</strong> {responses.context}</div>
              <div><strong>Objetivo:</strong> {responses.objective}</div>
            </div>
          )}
          
          {responses.gender === 'hombre' && (
            <div className="grid grid-cols-2 gap-4 text-sm bg-white rounded-xl p-4">
              <div><strong>Caída desde:</strong> {responses.hairLossTime}</div>
              <div><strong>Causa probable:</strong> {responses.hairLossCauses}</div>
              <div><strong>Problemas:</strong> {responses.problems.join(', ')}</div>
              <div><strong>Objetivo:</strong> {responses.objective}</div>
            </div>
          )}

          <div className="bg-white rounded-xl p-6 border-l-4 border-purple-600">
            <h4 className="font-semibold text-purple-800 mb-4">
              💧 Tu Fórmula Personalizada MIO:
            </h4>
            
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-semibold text-center mb-2">
                  "{formula.description}"
                </p>
                {formula.note && (
                  <p className="text-purple-600 text-sm italic text-center">
                    💡 {formula.note}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">🧴 Mi Fórmula de SHAMPOO:</h5>
                  <p className="text-blue-700 text-sm mb-1">• Mi Shampoo Base MIO</p>
                  <p className="text-blue-700 text-sm mb-1">• {formula.drops.shampoo}</p>
                  <p className="text-blue-700 text-sm">• Mi Aroma (a elegir)</p>
                </div>
                
                {formula.base.mascarilla && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">🧖‍♀️ Mi Fórmula de MASCARILLA:</h5>
                    <p className="text-green-700 text-sm mb-1">• Mi Mascarilla Base MIO</p>
                    <p className="text-green-700 text-sm mb-1">• {formula.drops.mascarilla}</p>
                    <p className="text-green-700 text-sm">• Mi Aroma (a elegir)</p>
                  </div>
                )}
              </div>
              
              <div>
                <h5 className="font-semibold text-purple-700 mb-2">🌸 Aromas disponibles:</h5>
                <div className="flex flex-wrap gap-2">
                  {formula.aromas.map((aroma, index) => (
                    <span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {aroma}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-purple-600 text-white p-4 rounded-lg text-center">
                <p className="font-bold text-lg mb-1">
                  Precio: ${formula.price.toLocaleString()} COP
                </p>
                <p className="text-purple-200 text-sm">
                  {formula.base.mascarilla ? 'Shampoo + Mascarilla + Drops + Aroma' : 'Shampoo + Drops + Aroma'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={nextStep}
              className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              Ver opciones de tratamiento
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTreatmentStep = () => {
    const formula = generatePersonalizedFormula();
    
    return (
      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Elige tu tratamiento capilar perfecto:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fórmula Personalizada MIO */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-2xl space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FlaskConical size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-4">🟢 MIO (Fórmula personalizada)</h3>
              
              <div className="bg-white/10 rounded-xl p-4 text-left space-y-3">
                <div>
                  <p className="font-semibold text-sm">Mi fórmula de SHAMPOO:</p>
                  <p className="text-xs opacity-90">{formula.drops.shampoo}</p>
                </div>
                
                {formula.base.mascarilla && (
                  <div>
                    <p className="font-semibold text-sm">Mi fórmula de MASCARILLA:</p>
                    <p className="text-xs opacity-90">{formula.drops.mascarilla}</p>
                  </div>
                )}
                
                <div className="bg-white/20 p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-1">Recomendación especializada:</p>
                  <p className="text-xs">{formula.description}</p>
                </div>
                
                <p className="font-bold text-lg text-center">
                  ${formula.price.toLocaleString()} COP
                </p>
              </div>
              
              <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Crear mi fórmula MIO
              </button>
            </div>
          </div>

          {/* Kit Tradicional */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white p-8 rounded-2xl space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-white" />
              </div>
              <h3 className="font-bold text-xl mb-4">🔵 Kit Tradicional</h3>
              
              <div className="bg-white/10 rounded-xl p-4 text-left space-y-3">
                <p className="font-semibold">{formula.kit}</p>
                <p className="text-sm opacity-90">
                  Kit completo con productos ya formulados de nuestras marcas Kamala y Salopém, 
                  diseñado específicamente para tu tipo de cabello y problema.
                </p>
                <div className="bg-white/20 p-3 rounded-lg">
                  <p className="text-xs font-semibold mb-1">Incluye:</p>
                  <p className="text-xs">Shampoo + Acondicionador/Mascarilla + Producto especializado</p>
                </div>
                <p className="font-bold text-lg text-center">
                  Desde $90,000 COP
                </p>
              </div>
              
              <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                Ver kits disponibles
              </button>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-xl p-6">
          <h4 className="font-semibold text-purple-800 mb-3 text-center">
            🎯 ¿Por qué esta recomendación específica?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-purple-700 mb-2">Tu perfil:</h5>
              <p className="text-purple-600">
                Cabello {responses.hairType} con {responses.priorities?.primary || responses.problems[0]} 
                {responses.context && ` en contexto de ${responses.context}`}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-purple-700 mb-2">Código de recomendación:</h5>
              <p className="text-purple-600 font-mono text-lg">
                {formula.code}
              </p>
            </div>
          </div>
          {formula.note && (
            <div className="mt-4 p-3 bg-purple-100 rounded-lg">
              <p className="text-purple-800 text-sm">
                <strong>💡 Nota especializada:</strong> {formula.note}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2">
            <span>💬</span>
            <span>WhatsApp: Obtener mi tratamiento</span>
          </button>
          <button 
            onClick={() => {
              setCurrentStep(0);
              setResponses({
                gender: '', hairType: '', routine: '', washFrequency: '', problems: [],
                priorities: { primary: '', secondary: '' }, dandruffType: '', context: '',
                objective: '', priorityLevel: '', hairLossTime: '', hairLossCauses: '',
                alopeciaStatus: '', noDandruff: false, customObjective: ''
              });
            }}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Hacer test nuevamente</span>
          </button>
        </div>
      </div>
    );
  };

  const canContinue = () => {
    const steps = getCurrentSteps();
    const step = steps[currentStep];
    
    switch (step) {
      case 'gender': return responses.gender !== '';
      case 'hairType': return responses.hairType !== '';
      case 'routine': return responses.routine !== '';
      case 'washFrequency': return responses.washFrequency !== '';
      case 'problems': return responses.problems.length > 0;
      case 'priorities': return responses.priorities?.primary !== '';
      case 'dandruff': return responses.dandruffType !== '';
      case 'context': return responses.context !== '';
      case 'objective': return responses.objective !== '' || responses.customObjective !== '';
      case 'priorityLevel': return responses.priorityLevel !== '';
      case 'hairLossTime': return responses.hairLossTime !== '';
      case 'hairLossCauses': return responses.hairLossCauses !== '';
      case 'alopecia': return responses.alopeciaStatus !== '';
      default: return true;
    }
  };

  const renderCurrentStep = () => {
    const steps = getCurrentSteps();
    const step = steps[currentStep];
    
    switch (step) {
      case 'gender': return renderGenderStep();
      case 'hairType': return renderHairTypeStep();
      case 'routine': return renderRoutineStep();
      case 'washFrequency': return renderWashFrequencyStep();
      case 'problems': return renderProblemsStep();
      case 'priorities': return renderPrioritiesStep();
      case 'dandruff': return renderDandruffStep();
      case 'context': return renderContextStep();
      case 'objective': return renderObjectiveStep();
      case 'priorityLevel': return renderPriorityLevelStep();
      case 'hairLossTime': return renderHairLossTimeStep();
      case 'hairLossCauses': return renderHairLossCausesStep();
      case 'alopecia': return renderAlopeciaStep();
      case 'result': return renderResultStep();
      case 'treatment': return renderTreatmentStep();
      default: return <div>Paso no encontrado</div>;
    }
  };

  const getStepPath = () => {
    const steps = getCurrentSteps();
    const step = steps[currentStep];
    const gender = responses.gender === 'mujer' ? 'mujer' : 'hombre';
    
    const paths = {
      gender: '/inicio',
      hairType: `/test-${gender}/cabello`,
      routine: `/test-${gender}/rutina`,
      washFrequency: `/test-${gender}/lavado`,
      problems: `/test-${gender}/molestias`,
      priorities: `/test-${gender}/prioridad`,
      dandruff: `/test-${gender}/caspa`,
      context: `/test-${gender}/contexto`,
      objective: `/test-${gender}/objetivo`,
      priorityLevel: `/test-${gender}/nivel-prioridad`,
      hairLossTime: `/test-${gender}/caida`,
      hairLossCauses: `/test-${gender}/causas`,
      alopecia: `/test-${gender}/alopecia`,
      result: `/test-${gender}/resultado`,
      treatment: `/test-${gender}/tratamiento`
    };
    
    return paths[step] || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-purple-600 text-white p-4 rounded-t-3xl flex justify-between items-center">
          <h1 className="text-2xl font-bold">Test Capilar Salopém</h1>
          {getStepPath() && (
            <span className="text-sm opacity-80">{getStepPath()}</span>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-b-3xl min-h-96">
          {renderCurrentStep()}
          
          {/* Continue Button */}
          {getCurrentSteps()[currentStep] !== 'result' && getCurrentSteps()[currentStep] !== 'treatment' && (
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
          {getCurrentSteps().slice(0, -2).map((_, index) => (
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