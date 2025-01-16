export interface IStyleOption {
  value: string;
  label: string;
}

export interface IStyleOptions {
  artStyle: string;
  colorTone: string;
}

export interface IGenerateFormData {
  prompt: string;
  styleOptions: IStyleOptions;
}

export interface IGeneratedImage {
  imageUrl: string;
  prompt: string;
  styleOptions: IStyleOptions;
} 