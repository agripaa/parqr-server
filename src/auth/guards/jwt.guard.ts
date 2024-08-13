import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const result = super.canActivate(context);
    return result;
  }

  handleRequest(err, user, info, context) {
    // console.log(`ERROR : `, err);
    // console.log(`USER : `, user);
    // console.log(`INFO : `, info);
    // console.log(`context : `, context);
    
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
