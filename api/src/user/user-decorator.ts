
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
    const user = req.args[0].user;
    delete user.salt;

    return req.args[0].user;
});