export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DEPLOY_GROUP: 'development' | 'production';

      AWS_SST_NAME: string;
      AWS_SST_ID: string;
      AWS_SST_STAGE: string;

      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_S3_BUCKET: string;
      AWS_CLOUD_FRONT_DISTRIBUTION_ID: string;

      NEXT_PUBLIC_SITE_URL: string;
      NEXT_PUBLIC_API_HOST: string;
      NEXT_PUBLIC_DEPLOY_GROUP: 'local' | 'development' | 'production';
    }
  }
}
