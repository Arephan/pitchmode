import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const client = new Anthropic();

app.use(express.json());
app.use(express.static('public'));

const PITCH_ANALYSIS_PROMPT = `You are an expert pitch coach for technical founders. Analyze the pitch below and provide constructive, actionable feedback.

PITCH:
{pitch}

Provide feedback in this exact JSON format:
{
  "overall_score": 0-100,
  "strengths": ["strength1", "strength2", ...],
  "weaknesses": ["weakness1", "weakness2", ...],
  "improvements": [
    {
      "area": "area_name",
      "current": "what they're doing now",
      "suggestion": "specific improvement",
      "example": "example of how to do it"
    }
  ],
  "clarity_score": 0-100,
  "traction_score": 0-100,
  "funding_readiness": 0-100,
  "key_takeaway": "one sentence summary of their strongest angle"
}`;

app.post('/api/analyze', async (req, res) => {
  const { pitch } = req.body;
  
  if (!pitch || pitch.trim().length < 20) {
    return res.status(400).json({ error: 'Pitch must be at least 20 characters' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: PITCH_ANALYSIS_PROMPT.replace('{pitch}', pitch)
      }]
    });

    const content = response.content[0].text;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Invalid response format from Claude');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing pitch:', error);
    res.status(500).json({ error: 'Failed to analyze pitch' });
  }
});

app.listen(3000, () => {
  console.log('🎤 PitchMode running on http://localhost:3000');
});
