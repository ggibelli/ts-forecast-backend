import { ObjectType, Field } from 'type-graphql';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  starredSpots: string[];
  createdSpots: string[];
}

export interface DecodedToken {
  id: string;
  token: string;
}

export interface Context {
  currentUser: User;
}

export interface Forecast {
  airTemperature: number;
  cloudCover: number;
  precipation: number;
  gust: number;
  secondarySwellDirection: number;
  secondarySwellHeight: number;
  secondarySwellPeriod: number;
  swellDirection: number;
  swellHeight: number;
  swellPeriod: number;
  waterTemperature: number;
  waveDirection: number;
  waveHeight: number;
  wavePeriod: number;
  windDirection: number;
  windSpeed: number;
  windWaveDirection: number;
  windWaveHeight: number;
  windWavePeriod: number;
}

@ObjectType()
export class ForecastData {
  @Field()
  public airTemperature!: number;

  @Field()
  public cloudCover!: number;

  @Field()
  public precipation!: number;

  @Field()
  public gust!: number;

  @Field()
  public secondarySwellDirection!: number;

  @Field()
  public secondarySwellHeight!: number;

  @Field()
  public secondarySwellPeriod!: number;

  @Field()
  public swellDirection!: number;

  @Field()
  public swellHeight!: number;

  @Field()
  public swellPeriod!: number;

  @Field()
  public waterTemperature!: number;

  @Field()
  public waveDirection!: number;

  @Field()
  public waveHeight!: number;

  @Field()
  public wavePeriod!: number;

  @Field()
  public windDirection!: number;

  @Field()
  public windSpeed!: number;

  @Field()
  public windWaveDirection!: number;

  @Field()
  public windWaveHeight!: number;

  @Field()
  public windWavePeriod!: number;
}

@ObjectType()
export class IForecast {
  @Field()
  public time!: string;

  @Field((_type) => [ForecastData])
  public data!: ForecastData[];
}

@ObjectType()
export class ITide {
  @Field()
  public time!: string;

  @Field()
  public type!: string;

  @Field()
  public height!: number;
}
