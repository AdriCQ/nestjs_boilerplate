import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
    createGqlOptions(): ApolloDriverConfig {
        return {
            autoSchemaFile: './schema.gql',
            sortSchema: true,
            debug: false,
            playground: true,
            context: ({ req }) => ({ headers: req.headers }),
        };
    }
}
