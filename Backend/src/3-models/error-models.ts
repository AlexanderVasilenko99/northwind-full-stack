import StatusCode from "./status-codes";

abstract class BaseError {
    public constructor(public status: number, public message: string) { }
}

export class RouteNotFound extends BaseError {
    public constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} not found.`);
    }
}

export class ResourceNotFound extends BaseError {
    public constructor(id: number) {
        super(StatusCode.NotFound, `id ${id} not found.`);
    }
}

export class Validation extends BaseError {
    public constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

export class Unauthorized extends BaseError {
    public constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}
export class Forbidden extends BaseError {
    public constructor(message: string) {
        super(StatusCode.Forbidden, message);
    }
}

