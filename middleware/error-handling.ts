export class ExistentError extends Error {
  code: number;
  message: string;
  description: string;
  type: string;

  constructor() {
    super();
    this.code = 303;
    this.message = 'Stamp ya existente';
    this.description =
      'El enlace fue ingresado anteriormente y ya se encuentra registrado en la aplicación.';
    this.type = 'info';
  }
}

export class DBConnectionError extends Error {
  code: number;
  message: string;
  description: string;
  type: string;

  constructor() {
    super();
    this.code = 500;
    this.message = 'Error al consultar Stamp';
    this.description =
      'Hubo un error al verificar el enlace, por favor intenta en otro momento.';
    this.type = 'error';
  }
}

export class WebScrapingError extends Error {
  code: number;
  message: string;
  description: string;
  type: string;

  constructor() {
    super();
    this.code = 500;
    this.message = 'Error al consultar Stamp';
    this.description =
      'Hubo un error al consultar el enlace, por favor verifica si es un enlace existente.';
    this.type = 'error';
  }
}

export class StoreError extends Error {
  code: number;
  message: string;
  description: string;
  type: string;

  constructor() {
    super();
    this.code = 500;
    this.message = 'Error al guardar Tweet';
    this.description =
      'Hubo un error al guardar el enlace, por favor intenta en otro momento.';
    this.type = 'error';
  }
}
