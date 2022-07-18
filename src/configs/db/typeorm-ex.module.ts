import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TYPEORM_EX_CUSTOM_REPOSITORY } from './typeorm-ex.decorator';

export class TypeOrmExModule {
  //데코레이터 만드는 패턴
  //function classDecorator<T extends { new (...args: any[]): {}>(constructor:T){}
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];
    for (const repository of repositories) {
      //typeorm-ex.decorator.ts 에서 setMetaData로 넣었던 값을 얻어옴
      const entity = Reflect.getMetadata(
        TYPEORM_EX_CUSTOM_REPOSITORY,
        repository,
      );
      //없으면 패스
      if (!entity) {
        continue;
      }
      //있다면
      providers.push({
        inject: [getDataSourceToken()], //DB 데이터 연결을 얻음
        provide: repository,
        //useFactory : 공급자를 동적으로 생성가능
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          //생성자 반환
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: TypeOrmExModule,
      providers,
    };
  }
}

//참조
//https://prod.velog.io/@pk3669/typeorm-0.3.x-EntityRepository-%EB%8F%8C%EB%A0%A4%EC%A4%98
