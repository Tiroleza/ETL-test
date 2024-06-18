import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          "mongodb+srv://tiroleza:123Mudar@smartparkcluster0.n3t1c1r.mongodb.net/?retryWrites=true&w=majority&appName=SmartParkCluster0"
        ),
        connectionName: "cluster2",
      }),
      inject: [ConfigService],
    }),
  ],
})
export class Database2Module {}
