import { NextResponse } from 'next/server';

interface RequestBody {
  message: string;
  draftResponse: string;
  tone: string;
}

interface ToneImprovements {
  addClarity?: string[];
  addPoliteness?: string[];
  addAction: string[];
  addWarmth?: string[];
  addEnthusiasm?: string[];
  addCasual?: string[];
  addFormality?: string[];
}

// Common grammar corrections
const grammarRules = {
  capitalization: [
    { pattern: /^[a-z]/, replace: (text: string) => text.charAt(0).toUpperCase() + text.slice(1) },
    { pattern: /[.!?]\s+[a-z]/g, replace: (text: string) => text.replace(/[.!?]\s+[a-z]/g, match => match.toUpperCase()) }
  ],
  punctuation: [
    { pattern: /\s+([.,!?])/g, replace: (text: string) => text.replace(/\s+([.,!?])/g, '$1') },
    { pattern: /([.,!?])([^\s])/g, replace: (text: string) => text.replace(/([.,!?])([^\s])/g, '$1 $2') }
  ],
  spacing: [
    { pattern: /\s+/g, replace: (text: string) => text.replace(/\s+/g, ' ') },
    { pattern: /\s+([.,!?])/g, replace: (text: string) => text.replace(/\s+([.,!?])/g, '$1') }
  ],
  commonMistakes: [
    { pattern: /\bi\b/g, replace: (text: string) => text.replace(/\bi\b/g, 'I') },
    { pattern: /\bim\b/g, replace: (text: string) => text.replace(/\bim\b/g, "I'm") },
    { pattern: /\bive\b/g, replace: (text: string) => text.replace(/\bive\b/g, "I've") },
    { pattern: /\bid\b/g, replace: (text: string) => text.replace(/\bid\b/g, "I'd") },
    { pattern: /\bthats\b/g, replace: (text: string) => text.replace(/\bthats\b/g, "that's") },
    { pattern: /\bwhats\b/g, replace: (text: string) => text.replace(/\bwhats\b/g, "what's") },
    { pattern: /\bwheres\b/g, replace: (text: string) => text.replace(/\bwheres\b/g, "where's") },
    { pattern: /\bwhos\b/g, replace: (text: string) => text.replace(/\bwhos\b/g, "who's") },
    { pattern: /\bwhys\b/g, replace: (text: string) => text.replace(/\bwhys\b/g, "why's") },
    { pattern: /\bhow's\b/g, replace: (text: string) => text.replace(/\bhow's\b/g, "how's") }
  ]
};

function correctGrammar(text: string): string {
  let corrected = text;

  // Apply capitalization rules
  grammarRules.capitalization.forEach(rule => {
    corrected = rule.replace(corrected);
  });

  // Apply punctuation rules
  grammarRules.punctuation.forEach(rule => {
    corrected = rule.replace(corrected);
  });

  // Apply spacing rules
  grammarRules.spacing.forEach(rule => {
    corrected = rule.replace(corrected);
  });

  // Apply common mistake corrections
  grammarRules.commonMistakes.forEach(rule => {
    corrected = rule.replace(corrected);
  });

  // Ensure proper sentence ending
  if (!/[.!?]$/.test(corrected)) {
    corrected += '.';
  }

  return corrected;
}

function improveResponse(
  originalMessage: string,
  draftResponse: string,
  tone: string
): string[] {
  const responses: string[] = [];
  const lowerMessage = originalMessage.toLowerCase();
  const lowerDraft = draftResponse.toLowerCase();

  // Correct grammar in the draft response
  const correctedDraft = correctGrammar(draftResponse);

  // Keep the original draft as the first suggestion
  responses.push(correctedDraft);

  // Improve the draft based on tone and context
  const improvements: Record<string, ToneImprovements> = {
    professional: {
      addClarity: [
        "I'd like to clarify that ",
        "To be more specific, ",
        "Let me elaborate: ",
        "I want to ensure we're aligned: "
      ],
      addPoliteness: [
        "I appreciate your message. ",
        "Thank you for your inquiry. ",
        "I understand your concern. ",
        "I value your input. "
      ],
      addAction: [
        "I'll proceed with this right away.",
        "I'll take care of this for you.",
        "I'll handle this matter promptly.",
        "I'll ensure this is addressed immediately."
      ]
    },
    friendly: {
      addWarmth: [
        "Great! ",
        "Awesome! ",
        "Perfect! ",
        "Excellent! "
      ],
      addEnthusiasm: [
        "I'm happy to help! ",
        "I'd love to assist! ",
        "I'm excited to help! ",
        "I'm thrilled to help! "
      ],
      addAction: [
        "I'll get right on it!",
        "I'll take care of this for you!",
        "I'll handle this right away!",
        "I'll make sure this gets done!"
      ]
    },
    casual: {
      addCasual: [
        "Cool! ",
        "Sure thing! ",
        "No problem! ",
        "Got it! "
      ],
      addAction: [
        "I'll get on it!",
        "I'll take care of it!",
        "I'll handle this!",
        "I'll make it happen!"
      ]
    },
    formal: {
      addFormality: [
        "I would like to inform you that ",
        "Please be advised that ",
        "I am writing to confirm that ",
        "I wish to convey that "
      ],
      addAction: [
        "I shall proceed accordingly.",
        "I will attend to this matter.",
        "I shall handle this for you.",
        "I will ensure this is addressed."
      ]
    }
  };

  // Generate improved versions based on tone
  const toneImprovements = improvements[tone] || improvements.professional;

  // Add a more detailed version
  if (toneImprovements.addClarity) {
    const detailedResponse = toneImprovements.addClarity[Math.floor(Math.random() * toneImprovements.addClarity.length)] + correctedDraft;
    responses.push(correctGrammar(detailedResponse));
  }

  // Add a more polite version
  if (toneImprovements.addPoliteness) {
    const politeResponse = toneImprovements.addPoliteness[Math.floor(Math.random() * toneImprovements.addPoliteness.length)] + correctedDraft;
    responses.push(correctGrammar(politeResponse));
  }

  // Add an action-oriented version
  const actionResponse = correctedDraft + " " + toneImprovements.addAction[Math.floor(Math.random() * toneImprovements.addAction.length)];
  responses.push(correctGrammar(actionResponse));

  // Add a tone-appropriate version
  if (tone === 'friendly' && toneImprovements.addWarmth) {
    const warmResponse = toneImprovements.addWarmth[Math.floor(Math.random() * toneImprovements.addWarmth.length)] + correctedDraft;
    responses.push(correctGrammar(warmResponse));
  }

  // Add a formal version for formal tone
  if (tone === 'formal' && toneImprovements.addFormality) {
    const formalResponse = toneImprovements.addFormality[Math.floor(Math.random() * toneImprovements.addFormality.length)] + correctedDraft;
    responses.push(correctGrammar(formalResponse));
  }

  // Add an enthusiastic version for friendly tone
  if (tone === 'friendly' && toneImprovements.addEnthusiasm) {
    const enthusiasticResponse = toneImprovements.addEnthusiasm[Math.floor(Math.random() * toneImprovements.addEnthusiasm.length)] + correctedDraft;
    responses.push(correctGrammar(enthusiasticResponse));
  }

  // Remove duplicates and limit to 3 responses
  return [...new Set(responses)].slice(0, 3);
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { message, draftResponse, tone } = body;

    const suggestions = improveResponse(message, draftResponse, tone);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error generating replies:', error);
    return NextResponse.json(
      { error: 'Failed to generate replies' },
      { status: 500 }
    );
  }
} 