'use client'

interface ToneSelectorProps {
  value: string
  onChange: (value: string) => void
}

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' }
]

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-700 mb-2">
        Select Tone
      </label>
      <div className="grid grid-cols-2 gap-2">
        {tones.map((tone) => (
          <button
            key={tone.value}
            type="button"
            onClick={() => onChange(tone.value)}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              value === tone.value
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tone.label}
          </button>
        ))}
      </div>
    </div>
  )
} 