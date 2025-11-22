interface ErrorDefinition {
    code: number;
    message: string;
    details?: any;
}

export class AppError extends Error {
    constructor(message: string, public code: number, public httpStatus: number = 500, public details: any = null) {
        super(message);
        this.name = this.constructor.name;
        this.httpStatus = httpStatus;
        this.code = code;
        if (details) {
            this.details = details;
        }
    }
}

export class BadRequestError extends AppError {
  constructor(errorDefinition: ErrorDefinition, validationDetails: any = null) {
    super(errorDefinition.message, errorDefinition.code, 400, validationDetails);
  }
}

export class NotFoundError extends AppError {
  constructor(errorDefinition: ErrorDefinition) {
    super(errorDefinition.message, errorDefinition.code, 404);
  }

}

export class ConflictError extends AppError {
  constructor(errorDefinition: ErrorDefinition, details: any = null) {
    super(errorDefinition.message, errorDefinition.code, 409, details);
  }
}

export class InternalServerError extends AppError {
  constructor(errorDefinition: ErrorDefinition, details: any = null) {
    super(errorDefinition.message, errorDefinition.code, 500, details);
  }
}