import { Global, Module } from '@nestjs/common';
import { Utils } from './utils';

@Global()
@Module({
  providers: [Utils],
  exports: [Utils],
})
export class UtilsModule {}
