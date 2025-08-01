// types/formTypes.ts

// 1. Enum para tipos de campo
export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  TEL = 'tel',
  NUMBER = 'number',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textarea',
  DATE = 'date',
  DATETIME_LOCAL = 'datetime-local',
  TIME = 'time',
  COLOR = 'color',
  RANGE = 'range',
  FILE = 'file',
  HIDDEN = 'hidden',
  PASSWORD = 'password',
  TAGS = 'tags',
  SWITCH = 'switch'
}

// 2. Tipo para configuração de valor padrão
type FieldTypeDefault = {
  type: FieldType;
  defaultValue: any;
  description: string;
};

// 3. Array com tipos e valores padrão
export const FIELD_TYPE_DEFAULTS: FieldTypeDefault[] = [
  { type: FieldType.TEXT, defaultValue: '', description: 'Campo de texto simples' },
  { type: FieldType.EMAIL, defaultValue: '', description: 'Campo de e-mail' },
  { type: FieldType.TEL, defaultValue: '', description: 'Campo de telefone' },
  { type: FieldType.NUMBER, defaultValue: 0, description: 'Campo numérico' },
  { type: FieldType.SELECT, defaultValue: '', description: 'Seleção dropdown' },
  { type: FieldType.CHECKBOX, defaultValue: false, description: 'Caixa de seleção' },
  { type: FieldType.RADIO, defaultValue: '', description: 'Botões de opção' },
  { type: FieldType.TEXTAREA, defaultValue: '', description: 'Área de texto' },
  { 
    type: FieldType.DATE, 
    defaultValue: new Date().toISOString().split('T')[0],
    description: 'Seletor de data' 
  },
  {
    type: FieldType.DATETIME_LOCAL,
    defaultValue: new Date().toISOString().slice(0, 16),
    description: 'Data e hora'
  },
  { type: FieldType.TIME, defaultValue: '12:00', description: 'Seletor de hora' },
  { type: FieldType.COLOR, defaultValue: '#000000', description: 'Seletor de cor' },
  { type: FieldType.RANGE, defaultValue: 50, description: 'Controle deslizante' },
  { type: FieldType.FILE, defaultValue: null, description: 'Upload de arquivo' },
  { type: FieldType.HIDDEN, defaultValue: '', description: 'Campo oculto' },
  { type: FieldType.PASSWORD, defaultValue: '', description: 'Campo de senha' },
  { type: FieldType.TAGS, defaultValue: [], description: 'Campo de tags' },
  { type: FieldType.SWITCH, defaultValue: false, description: 'Interruptor' }
];

// 4. Função para obter valor padrão
export const getDefaultValueForType = (type: FieldType): any => {
  const typeConfig = FIELD_TYPE_DEFAULTS.find(t => t.type === type);
  return typeConfig ? typeConfig.defaultValue : '';
};

// 5. Interface principal para configuração de campo
export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  defaultValue?: any;
  validation?: Record<string, any>;
  min?: number;
  max?: number;
  step?: number;
  order?: number;
}