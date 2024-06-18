import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(), // Carrega as variáveis de ambiente do arquivo .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          "mongodb+srv://tiroleza:123Mudar@predatacluster.ntzlog5.mongodb.net/?retryWrites=true&w=majority&appName=PreDataCluster"
        ),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_CLUSTER2_URI"),
        connectionName: "cluster2",
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
