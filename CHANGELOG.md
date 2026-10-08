# Changelog

All notable changes to this project will be documented in this file.

## [4.14.0](https://github.com/equinor/radix-web-console/compare/v4.13.0..v4.14.0) - 2026-09-30

### 🚀 Features

- Secret last updated at - ([d3a8e9b](https://github.com/equinor/radix-web-console/commit/d3a8e9b4c9bb82275c055b88d9cc31737b29864f)) by @Richard87

- Use RelativeToNow for updated time display - ([5376b6a](https://github.com/equinor/radix-web-console/commit/5376b6a3e436a70c62d89e1b9d31de34bfaa11e2)) by @Richard87

- Secret last updated at - ([4cf8c3a](https://github.com/equinor/radix-web-console/commit/4cf8c3afd262213e53a9439c70c4b9a847ffb6e4)) by @Richard87 in [#1188](https://github.com/equinor/radix-web-console/pull/1188)

- Use workload identity for web-console in dev (#1192) - ([3b0ce15](https://github.com/equinor/radix-web-console/commit/3b0ce156b31e399d07e6bf733e26c01b4aaa6528)) by @Richard87 in [#1192](https://github.com/equinor/radix-web-console/pull/1192)

- Oauth Workload Identity in all environments (#1193) - ([59e2ada](https://github.com/equinor/radix-web-console/commit/59e2ada0416f2c9b2eb2aacb7d08c4be723db7e4)) by @Richard87 in [#1193](https://github.com/equinor/radix-web-console/pull/1193)

- Reload browser when refresh token expires (#1220) - ([b5d0d64](https://github.com/equinor/radix-web-console/commit/b5d0d64b6fb1085deea313c21b347f83f2b973f2)) by @Richard87 in [#1220](https://github.com/equinor/radix-web-console/pull/1220)

- Show correct image and optional variables for Radix jobs - ([5542f9e](https://github.com/equinor/radix-web-console/commit/5542f9e588e78c2931dba173e67c328773c95f70)) by @satr in [#1240](https://github.com/equinor/radix-web-console/pull/1240)

- Configurable command and args in jobs - ([44bc977](https://github.com/equinor/radix-web-console/commit/44bc977ab9f71822788dee808204a2d1e858e665)) by @satr in [#1243](https://github.com/equinor/radix-web-console/pull/1243)

- Store AppID instead of SysID for configuration item (#1247) - ([bf5bba5](https://github.com/equinor/radix-web-console/commit/bf5bba5ae74299c508fa06b7e417f7ffa3b18d61)) by @Richard87 in [#1247](https://github.com/equinor/radix-web-console/pull/1247)

- Update servicenow api (#1249) - ([bbe57ad](https://github.com/equinor/radix-web-console/commit/bbe57ad98a0be2a9afe4b019a28c7e6d0e870628)) by @Richard87 in [#1249](https://github.com/equinor/radix-web-console/pull/1249)

- Upgrade logger with colors, scroll behavior and streaming (#1291) - ([742cbe7](https://github.com/equinor/radix-web-console/commit/742cbe7601e2cc090b85f3186fd662e07efeff61)) by @Richard87 in [#1291](https://github.com/equinor/radix-web-console/pull/1291)

- Replace oauth2-proxy with MSAL and PKCE (#1293) - ([c414586](https://github.com/equinor/radix-web-console/commit/c4145861f46a3e13f905dffb89fdf17fb99df91a)) by @nilsgstrabo in [#1293](https://github.com/equinor/radix-web-console/pull/1293)

- Show info about logged in user and add sign-in and switch-user actions (#1296) - ([7c9461d](https://github.com/equinor/radix-web-console/commit/7c9461dd59afc119405a8c6def9e260ff5d0938a)) by @nilsgstrabo in [#1296](https://github.com/equinor/radix-web-console/pull/1296)

- Automatic refresh of application list on initial load and every 24 hours (#1307) - ([07a7523](https://github.com/equinor/radix-web-console/commit/07a75239a4f5674691343115f9558d117df50811)) by @nilsgstrabo in [#1307](https://github.com/equinor/radix-web-console/pull/1307)

- Fetch values from API instead of environment. (#1310) - ([ba2cc27](https://github.com/equinor/radix-web-console/commit/ba2cc272bf53f4160d87510aea1ffd25a5428bd1)) by @jacobsolbergholm in [#1310](https://github.com/equinor/radix-web-console/pull/1310)

- Enable c3 in web-console (#1320) - ([7dcdf0a](https://github.com/equinor/radix-web-console/commit/7dcdf0ac633aa5c143ed927e446163447c8e6d60)) by @Richard87 in [#1320](https://github.com/equinor/radix-web-console/pull/1320)

- Add deployment status handling (#1342) - ([04b39dc](https://github.com/equinor/radix-web-console/commit/04b39dcab26a9e05888ebbf7f25599e2d944bc86)) by @nilsgstrabo in [#1342](https://github.com/equinor/radix-web-console/pull/1342)

- Initial frontend structure refactor (#1355) - ([73b9bd3](https://github.com/equinor/radix-web-console/commit/73b9bd3fe8966c795ebd71ffc6dfdea25273b352)) by @kristin-pettersen in [#1355](https://github.com/equinor/radix-web-console/pull/1355)

- Add Storybook and migrate `dev.tsx` files to stories (#1372) - ([2da9d5d](https://github.com/equinor/radix-web-console/commit/2da9d5dbb41e818d753c83515ae86c076e5c5150)) by @kristin-pettersen in [#1372](https://github.com/equinor/radix-web-console/pull/1372)

- Migrate Federated Credentials banners (#1374) - ([3531d7a](https://github.com/equinor/radix-web-console/commit/3531d7a3fdd9e535a6a02f97628d87f7e82f7583)) by @kristin-pettersen in [#1374](https://github.com/equinor/radix-web-console/pull/1374)

- Migrate to OIDC native auth (#1369) - ([2807713](https://github.com/equinor/radix-web-console/commit/28077135a3a634acd5cecdc6148b5a277f8a049b)) by @Richard87 in [#1369](https://github.com/equinor/radix-web-console/pull/1369)

- Environment card refactor (#1383) - ([8785ff2](https://github.com/equinor/radix-web-console/commit/8785ff25df8f02bc143c2f0b2fd7dd4b48bb9a36)) by @kristin-pettersen in [#1383](https://github.com/equinor/radix-web-console/pull/1383)

- Cron jobs (#1393) - ([a47b17d](https://github.com/equinor/radix-web-console/commit/a47b17d1ac93358e1e112d1c765f7bddbb91ab19)) by @kristin-pettersen in [#1393](https://github.com/equinor/radix-web-console/pull/1393)

- Add search for applications (#1394) - ([d790e00](https://github.com/equinor/radix-web-console/commit/d790e004429504391d1f397fdd380e10aeca14d8)) by @kristin-pettersen in [#1394](https://github.com/equinor/radix-web-console/pull/1394)

- 1282 Pipeline jobs table updates + new pipeline job waiting screen (#1398) - ([ccb9242](https://github.com/equinor/radix-web-console/commit/ccb9242de8c8f874538ecbf4a5d34e610f1d8447)) by @kristin-pettersen in [#1398](https://github.com/equinor/radix-web-console/pull/1398)

- 1254 super header  (#1401) - ([ff5084a](https://github.com/equinor/radix-web-console/commit/ff5084afff6927e69d137f0c7908108f9b783859)) by @kristin-pettersen in [#1401](https://github.com/equinor/radix-web-console/pull/1401)

- Add test environment configuration (#1406) - ([ead7eb0](https://github.com/equinor/radix-web-console/commit/ead7eb0690ce0e2bc470b50f0cb37631d9253677)) by @nilsgstrabo in [#1406](https://github.com/equinor/radix-web-console/pull/1406)

- 1373 Remove temporary banner  - ([6ff04a8](https://github.com/equinor/radix-web-console/commit/6ff04a81f81a39deb7209a03bb4ee1f7363f6b4a)) by @kristin-pettersen in [#1413](https://github.com/equinor/radix-web-console/pull/1413)

- Install using Helm instead of Radix application (#1412) - ([8cbea6d](https://github.com/equinor/radix-web-console/commit/8cbea6d2c0bd8f5c76df775990cb0aac34f2b730)) by @Richard87 in [#1412](https://github.com/equinor/radix-web-console/pull/1412)


### 🐛 Bug Fixes

- *(codeql)* Cleanup logic (#1333) - ([33dbed2](https://github.com/equinor/radix-web-console/commit/33dbed290095d9bfe4325e78bf690fd13d59cf1c)) by @Richard87 in [#1333](https://github.com/equinor/radix-web-console/pull/1333)

- *(deps)* Bump the npm_and_yarn group across 1 directory with 1 update (#1335) - ([6f95cff](https://github.com/equinor/radix-web-console/commit/6f95cffff096fea9b3f9420561405de0c863ee3a)) by @dependabot[bot] in [#1335](https://github.com/equinor/radix-web-console/pull/1335)

- Upgrade react-toastify from 9.1.2 to 9.1.3 (#767) - ([8269fee](https://github.com/equinor/radix-web-console/commit/8269fee49c56aa9cb8afba7fd75a69eb065df890)) by @nilsgstrabo in [#767](https://github.com/equinor/radix-web-console/pull/767)

- Upgrade @types/microsoft-graph from 2.29.0 to 2.32.0 (#766) - ([6fe9c92](https://github.com/equinor/radix-web-console/commit/6fe9c927274dabea7ff9b111928b6c713cf9a5ca)) by @nilsgstrabo in [#766](https://github.com/equinor/radix-web-console/pull/766)

- Upgrade @types/microsoft-graph from 2.32.0 to 2.33.0 (#769) - ([f3570db](https://github.com/equinor/radix-web-console/commit/f3570db4d78087f69746ac89a52a82a1af35a7ea)) by @emirgens in [#769](https://github.com/equinor/radix-web-console/pull/769)

- Upgrade @babel/core from 7.21.8 to 7.22.1 (#771) - ([3110ec3](https://github.com/equinor/radix-web-console/commit/3110ec38992552fff806d7c2b9368e87a7f38604)) by @oyron in [#771](https://github.com/equinor/radix-web-console/pull/771)

- Upgrade styled-components from 5.3.10 to 5.3.11 (#775) - ([00eacaa](https://github.com/equinor/radix-web-console/commit/00eacaaa950fd266e786cfd1890c76febd08d627)) by @oyron in [#775](https://github.com/equinor/radix-web-console/pull/775)

- Upgrade @types/lodash from 4.14.194 to 4.14.195 (#774) - ([f6c2f0d](https://github.com/equinor/radix-web-console/commit/f6c2f0dd9ccd5a770a2dc236990bc589883d4b9c)) by @oyron in [#774](https://github.com/equinor/radix-web-console/pull/774)

- Upgrade @types/react from 17.0.59 to 17.0.60 (#772) - ([fd3ab8e](https://github.com/equinor/radix-web-console/commit/fd3ab8ea951bbc6f21f3886cfbf7f2f2bf33ec80)) by @oyron in [#772](https://github.com/equinor/radix-web-console/pull/772)

- Upgrade @types/microsoft-graph from 2.33.0 to 2.33.1 (#773) - ([c93d2d4](https://github.com/equinor/radix-web-console/commit/c93d2d450c251fc27147865acbd59dd611e1d465)) by @oyron in [#773](https://github.com/equinor/radix-web-console/pull/773)

- Upgrade @azure/msal-react from 1.5.7 to 1.5.8 (#786) - ([a19869c](https://github.com/equinor/radix-web-console/commit/a19869c7233bcddd1208ebd45e135788fb071983)) by @sondresjolyst in [#786](https://github.com/equinor/radix-web-console/pull/786)

- Upgrade @azure/msal-browser from 2.37.0 to 2.37.1 (#785) - ([0155a51](https://github.com/equinor/radix-web-console/commit/0155a5175b75f3ba97077c52d1183c5aa57a7547)) by @sondresjolyst in [#785](https://github.com/equinor/radix-web-console/pull/785)

- Package.json & package-lock.json to reduce vulnerabilities - ([8f7a468](https://github.com/equinor/radix-web-console/commit/8f7a468744cbc893803f0d174619f826ecef0d56)) by @snyk-bot

- Upgrade @azure/msal-browser from 2.37.1 to 2.38.0 (#805) - ([ddcfe86](https://github.com/equinor/radix-web-console/commit/ddcfe86e2ffacbd14dc418a244f175ac2a77669c)) by @nilsgstrabo in [#805](https://github.com/equinor/radix-web-console/pull/805)

- Upgrade @azure/msal-react from 1.5.8 to 1.5.9 (#804) - ([7ced5bb](https://github.com/equinor/radix-web-console/commit/7ced5bb1b8fc1ec6f5f9bcc5d587a08a7ac2cbe2)) by @nilsgstrabo in [#804](https://github.com/equinor/radix-web-console/pull/804)

- Upgrade @babel/core from 7.22.6 to 7.22.8 (#803) - ([69b00a5](https://github.com/equinor/radix-web-console/commit/69b00a54b918f1d1a7b7897a66f0a4019c3121b1)) by @nilsgstrabo in [#803](https://github.com/equinor/radix-web-console/pull/803)

- Upgrade @equinor/eds-icons from 0.19.1 to 0.19.2 (#802) - ([79a929c](https://github.com/equinor/radix-web-console/commit/79a929c5898f4e5811eb2478d7185e783e9282d4)) by @sondresjolyst in [#802](https://github.com/equinor/radix-web-console/pull/802)

- Upgrade @equinor/eds-core-react from 0.31.1 to 0.32.0 (#807) - ([f37ac05](https://github.com/equinor/radix-web-console/commit/f37ac05fc059d5cd5050502f9faa38f5c1019630)) by @sondresjolyst in [#807](https://github.com/equinor/radix-web-console/pull/807)

- Upgrade typescript from 5.1.6 to 5.2.2 (#829) - ([7b56362](https://github.com/equinor/radix-web-console/commit/7b56362364de6bc3984a56a39549aeef71a16bfb)) by @satr in [#829](https://github.com/equinor/radix-web-console/pull/829)

- Upgrade date-fns from 3.0.5 to 3.0.6 (#925) - ([5f164a7](https://github.com/equinor/radix-web-console/commit/5f164a709601b93b18176a6b8812af3215eb9a0e)) by @emirgens in [#925](https://github.com/equinor/radix-web-console/pull/925)

- Upgrade react-router from 6.21.0 to 6.21.1 (#923) - ([4b2a894](https://github.com/equinor/radix-web-console/commit/4b2a8945a63d6bd14e95a3b62e5048b28cc5d521)) by @emirgens in [#923](https://github.com/equinor/radix-web-console/pull/923)

- Upgrade react-router-dom from 6.21.0 to 6.21.1 (#924) - ([ddfc196](https://github.com/equinor/radix-web-console/commit/ddfc1965fe42f9e037f99bee2de126991b654927)) by @emirgens in [#924](https://github.com/equinor/radix-web-console/pull/924)

- Package.json & package-lock.json to reduce vulnerabilities (#914) - ([4466fe1](https://github.com/equinor/radix-web-console/commit/4466fe1aea4276ad124129f48a47147a60a04556)) by @satr in [#914](https://github.com/equinor/radix-web-console/pull/914)

- Upgrade vitest from 1.1.0 to 1.1.1 - ([03c32e2](https://github.com/equinor/radix-web-console/commit/03c32e22eaa5e9ebc7872267fc157ef210f2509f)) by @snyk-bot

- Upgrade @azure/msal-browser from 3.6.0 to 3.7.0 - ([52cbf07](https://github.com/equinor/radix-web-console/commit/52cbf0732f3ada50b785889f9ff8c38589059b95)) by @snyk-bot

- Upgrade date-fns from 3.0.6 to 3.1.0 - ([85fda96](https://github.com/equinor/radix-web-console/commit/85fda9611e1e93d074b2a2928d6aeaa64e467eed)) by @snyk-bot

- Upgrade jsdom from 23.0.1 to 23.1.0 - ([da707f7](https://github.com/equinor/radix-web-console/commit/da707f772152ee3b29e2d4d2c6fe12818985476b)) by @snyk-bot

- Upgrade @azure/msal-browser from 3.7.0 to 3.9.0 - ([857ff6e](https://github.com/equinor/radix-web-console/commit/857ff6e0bc0e6d728e8a759d461708fd99066a85)) by @snyk-bot

- Upgrade @azure/msal-react from 2.0.8 to 2.0.9 - ([d371815](https://github.com/equinor/radix-web-console/commit/d371815471d9a8b4bab8f7e07ab6a1cbeaf32881)) by @snyk-bot

- Upgrade @typescript-eslint/eslint-plugin from 6.19.1 to 6.21.0 - ([5d6fb0f](https://github.com/equinor/radix-web-console/commit/5d6fb0f95783da1252d52eda38087862567b50da)) by @snyk-bot

- Upgrade react-router from 6.21.1 to 6.22.0 - ([0e008cb](https://github.com/equinor/radix-web-console/commit/0e008cb86bfe23daa22c2625d34a46a1372fd9b0)) by @snyk-bot

- Upgrade @types/react from 18.2.48 to 18.2.55 - ([2ba606c](https://github.com/equinor/radix-web-console/commit/2ba606c2f97c813bc317209a93a69de7e625d542)) by @snyk-bot

- Upgrade typescript from 5.3.3 to 5.4.3 (#1007) - ([287c74a](https://github.com/equinor/radix-web-console/commit/287c74a8605754457c3a1626ba906530da45f2b5)) by @satr in [#1007](https://github.com/equinor/radix-web-console/pull/1007)

- Upgrade typescript from 5.3.3 to 5.4.5 (#1022) - ([14ec1f2](https://github.com/equinor/radix-web-console/commit/14ec1f2b460ec88d51ef64db0e6fb373fc9a534f)) by @satr in [#1022](https://github.com/equinor/radix-web-console/pull/1022)

- Highlight c2 cluster only when selected - ([22d9196](https://github.com/equinor/radix-web-console/commit/22d91968e5b6acbe2b2999bef95d71c51194204e)) by @nilsgstrabo

- Correct import order in secret-updated-badge.tsx - ([f53a0ce](https://github.com/equinor/radix-web-console/commit/f53a0ce7baa59791de4d0c3f75ec7fed4c0d5ccc)) by @Richard87

- Disable client cache of index html (#1198) - ([bb978b5](https://github.com/equinor/radix-web-console/commit/bb978b57113cd71c66ab0b7eafbf0a77012d7c32)) by @nilsgstrabo in [#1198](https://github.com/equinor/radix-web-console/pull/1198)

- Bump form-data in the npm_and_yarn group across 1 directory (#1244) - ([e723957](https://github.com/equinor/radix-web-console/commit/e723957b8b01dd9744e2a2e30cb36531a7eac1d3)) by @dependabot[bot] in [#1244](https://github.com/equinor/radix-web-console/pull/1244)

- Use correct configuration item (#1286) - ([3426ad0](https://github.com/equinor/radix-web-console/commit/3426ad0405281d04bfaa70ad88c48728aace3514)) by @Richard87 in [#1286](https://github.com/equinor/radix-web-console/pull/1286)

- Formatting 120ch + no semicolons (#1290) - ([8678485](https://github.com/equinor/radix-web-console/commit/86784850ecb98f96709c32b97a545cefe1d0acd5)) by @Richard87 in [#1290](https://github.com/equinor/radix-web-console/pull/1290)

- New auth context on active account change (#1297) - ([fe61309](https://github.com/equinor/radix-web-console/commit/fe613098571ae494eebafc089736bdff0a036cbe)) by @nilsgstrabo in [#1297](https://github.com/equinor/radix-web-console/pull/1297)

- Migrate local storage hooks to use MSAL account context for better account-specific data handling (#1301) - ([bfcdd34](https://github.com/equinor/radix-web-console/commit/bfcdd3443291ecbb467db15c3a4686dba928345b)) by @nilsgstrabo in [#1301](https://github.com/equinor/radix-web-console/pull/1301)

- Update dependencies (#1328) - ([4561654](https://github.com/equinor/radix-web-console/commit/45616540b5f97de3dd5688358a094574c2793d84)) by @Richard87 in [#1328](https://github.com/equinor/radix-web-console/pull/1328)

- Enable HTTP/2 support in server configuration (#1336) - ([fd3b3b0](https://github.com/equinor/radix-web-console/commit/fd3b3b0a366a8a0680a3ff8ac0ff53e0b09a1924)) by @nilsgstrabo in [#1336](https://github.com/equinor/radix-web-console/pull/1336)

- Rename omnia radix to radix (#1345) - ([d6af47e](https://github.com/equinor/radix-web-console/commit/d6af47e8827923395f4c6b62b7506f486e25e31e)) by @Richard87 in [#1345](https://github.com/equinor/radix-web-console/pull/1345)

- Show BuildKit used/unknown/unused (#1348) - ([19835fc](https://github.com/equinor/radix-web-console/commit/19835fcc1ea4be81aec809a51977f3e8185b343a)) by @Richard87 in [#1348](https://github.com/equinor/radix-web-console/pull/1348)

- Update API server URL configuration (#1352) - ([7ed96a4](https://github.com/equinor/radix-web-console/commit/7ed96a4b25cd5ec9e22fa439c151fb8b1d7d3060)) by @Richard87 in [#1352](https://github.com/equinor/radix-web-console/pull/1352)

- Use api.radix.equinor.com instead of webhook (#1358) - ([f27281b](https://github.com/equinor/radix-web-console/commit/f27281bafd2c57d98f25e9479799f8a3c0174a82)) by @Richard87 in [#1358](https://github.com/equinor/radix-web-console/pull/1358)

- Use workload identity namespace from azureidentity model (#1360) - ([4237db8](https://github.com/equinor/radix-web-console/commit/4237db8a35a88a573475679adf67546b72bc4dac)) by @nilsgstrabo in [#1360](https://github.com/equinor/radix-web-console/pull/1360)

- Remove BuildKit references (#1365) - ([b7b4884](https://github.com/equinor/radix-web-console/commit/b7b4884865889855b86ee9d789338af40cdd4b8e)) by @Richard87 in [#1365](https://github.com/equinor/radix-web-console/pull/1365)

- Add preview of vite build, fix docker compose (#1371) - ([3ec7d07](https://github.com/equinor/radix-web-console/commit/3ec7d077fddfbc0f2b5cd463d5d27e4d56de41f9)) by @kristin-pettersen in [#1371](https://github.com/equinor/radix-web-console/pull/1371)

- Add known authorities for MSAL OIDC configuration (#1377) - ([c8e5a72](https://github.com/equinor/radix-web-console/commit/c8e5a72cb8271a4c8932687d30b6147d40999805)) by @Richard87 in [#1377](https://github.com/equinor/radix-web-console/pull/1377)

- Upgrade MSAL and introduce OAUTH2_KNOWN_AUTHORITIES environment variable (#1378) - ([89f6ce4](https://github.com/equinor/radix-web-console/commit/89f6ce4938160e89a87bf9b48774377b144e9bba)) by @Richard87 in [#1378](https://github.com/equinor/radix-web-console/pull/1378)

- Recover when a session can't be silently renewed (#1380) - ([0b858b5](https://github.com/equinor/radix-web-console/commit/0b858b5821fbbc6d3fb2f91a0a091deface87497)) by @kristin-pettersen in [#1380](https://github.com/equinor/radix-web-console/pull/1380)

- Redirect user if token access fails (#1382) - ([95d6343](https://github.com/equinor/radix-web-console/commit/95d63435e39d1e18b9cfe7a115c1250c932d52d3)) by @kristin-pettersen in [#1382](https://github.com/equinor/radix-web-console/pull/1382)

- Update Node.js and NGINX versions in Docker configuration (#1384) - ([c6341b1](https://github.com/equinor/radix-web-console/commit/c6341b1d8d519701de63ce32682cb1f7095ea666)) by @nilsgstrabo in [#1384](https://github.com/equinor/radix-web-console/pull/1384)

- Show nice sharedsecret when its empty, fix logout in oidc (#1386) - ([c2e3385](https://github.com/equinor/radix-web-console/commit/c2e338545fc9b2524469cb9579b4d71f5a9e33d8)) by @Richard87 in [#1386](https://github.com/equinor/radix-web-console/pull/1386)

- Set replica endtime to job endtime when status is stopped and no replica endtime  (#1388) - ([37229b3](https://github.com/equinor/radix-web-console/commit/37229b38b52ff811d5cc8143e1078b7c9b8d57fa)) by @herda1 in [#1388](https://github.com/equinor/radix-web-console/pull/1388)

- Remove shared secret from configuration and update regeneration logic (#1390) - ([5d696d4](https://github.com/equinor/radix-web-console/commit/5d696d4b7c35e3cfa43d787c58c258fb19def733)) by @Richard87 in [#1390](https://github.com/equinor/radix-web-console/pull/1390)

- Remove usage of deployment field(#1392) - ([a0ded52](https://github.com/equinor/radix-web-console/commit/a0ded5200efbf4ed3933770fa8040c09cb565d69)) by @herda1 in [#1392](https://github.com/equinor/radix-web-console/pull/1392)

- Regenerate api schema (#1395) - ([fbc661f](https://github.com/equinor/radix-web-console/commit/fbc661f98f09c96219d00b8620efc56857b59d51)) by @herda1 in [#1395](https://github.com/equinor/radix-web-console/pull/1395)

- Login issues (#1402) - ([13485a4](https://github.com/equinor/radix-web-console/commit/13485a4b4ff176664456a63565b64e6a62c30ff0)) by @kristin-pettersen in [#1402](https://github.com/equinor/radix-web-console/pull/1402)

- Remove link from interactive row, add click handler (#1407) - ([7808bd2](https://github.com/equinor/radix-web-console/commit/7808bd26a9e03db2c1457f38ab06377113fba68b)) by @kristin-pettersen in [#1407](https://github.com/equinor/radix-web-console/pull/1407)

- Update deps (#1410) - ([0e414de](https://github.com/equinor/radix-web-console/commit/0e414dee633854018b979dc2f937f75afa8bcab2)) by @herda1 in [#1410](https://github.com/equinor/radix-web-console/pull/1410)

- Add buildplatform to dockerfile (#1416) - ([dc0710d](https://github.com/equinor/radix-web-console/commit/dc0710d15df1e202459fd1b589d5006f517f7a8e)) by @Richard87 in [#1416](https://github.com/equinor/radix-web-console/pull/1416)


### 💼 Other

- Enhance the webhook/deploykey walktrough (#1170) - ([1e43f9e](https://github.com/equinor/radix-web-console/commit/1e43f9e2040166c224825e6fae193d754ae8c70b)) by @Richard87 in [#1170](https://github.com/equinor/radix-web-console/pull/1170)


### 📚 Documentation

- Show deployment name, commitId, tag for components, batches and jobs - ([cb9142b](https://github.com/equinor/radix-web-console/commit/cb9142b61760e1bba413b8393d4de1bbf61080a8)) by @satr in [#1238](https://github.com/equinor/radix-web-console/pull/1238)

- Update Varia catalog-info.yaml (#1325) - ([5ba2c24](https://github.com/equinor/radix-web-console/commit/5ba2c24f830198d67e6a6b69fefe4b75fc72d9bf)) by @emirgens in [#1325](https://github.com/equinor/radix-web-console/pull/1325)

- Update catalog-info.yaml (#1330) - ([5d66172](https://github.com/equinor/radix-web-console/commit/5d66172a076f66c55de21aa233a20d459979e486)) by @emirgens in [#1330](https://github.com/equinor/radix-web-console/pull/1330)


### ⚙️ Miscellaneous Tasks

- *(ci)* Update github workflows to latest version and pin to sha - ([286d1d1](https://github.com/equinor/radix-web-console/commit/286d1d176da7fff16b537313b021cb9a150e57c4)) by @sveinpj in [#1341](https://github.com/equinor/radix-web-console/pull/1341)

- Disallow redirects in api calls, this usually means we are logged out, and CORS will block any renewals anyway (#1197) - ([c51f521](https://github.com/equinor/radix-web-console/commit/c51f5215460f0043141eb58cdb7f1367603d7d1a)) by @Richard87 in [#1197](https://github.com/equinor/radix-web-console/pull/1197)

- Bump dependencies (#1226) - ([08745cf](https://github.com/equinor/radix-web-console/commit/08745cfcbb3d09f797ad9d9d41e4fc832401b566)) by @nilsgstrabo in [#1226](https://github.com/equinor/radix-web-console/pull/1226)

- Add catalog-info.yaml config file (#1315) - ([3adfafe](https://github.com/equinor/radix-web-console/commit/3adfafe40b57187dfefee4629bdc87082396d309)) by @emirgens in [#1315](https://github.com/equinor/radix-web-console/pull/1315)

- Regenerate radix-api client (#1319) - ([63a1c09](https://github.com/equinor/radix-web-console/commit/63a1c0902133b86d72d9ac3f0392976e93aa1a99)) by @nilsgstrabo in [#1319](https://github.com/equinor/radix-web-console/pull/1319)


## New Contributors ❤️

* @github-actions[bot] made their first contribution in [#1417](https://github.com/equinor/radix-web-console/pull/1417)
* @Richard87 made their first contribution in [#1416](https://github.com/equinor/radix-web-console/pull/1416)
* @kristin-pettersen made their first contribution in [#1413](https://github.com/equinor/radix-web-console/pull/1413)
* @herda1 made their first contribution in [#1410](https://github.com/equinor/radix-web-console/pull/1410)
* @sveinpj made their first contribution in [#1341](https://github.com/equinor/radix-web-console/pull/1341)
* @jacobsolbergholm made their first contribution in [#1310](https://github.com/equinor/radix-web-console/pull/1310)
* @tkalve made their first contribution in [#1162](https://github.com/equinor/radix-web-console/pull/1162)
* @anneliawa made their first contribution in [#858](https://github.com/equinor/radix-web-console/pull/858)
* @sondresjolyst made their first contribution in [#807](https://github.com/equinor/radix-web-console/pull/807)
* @oyron made their first contribution in [#773](https://github.com/equinor/radix-web-console/pull/773)
## [4.12.0](https://github.com/equinor/radix-web-console/compare/v4.10.1..v4.12.0) - 2022-04-06

### 🐛 Bug Fixes

- Package.json & package-lock.json to reduce vulnerabilities - ([23456ff](https://github.com/equinor/radix-web-console/commit/23456ffb8b7d835fcbf218b7810a7a522fee5f8d)) by @snyk-bot


## New Contributors ❤️

* @magnus-longva-bouvet made their first contribution in [#512](https://github.com/equinor/radix-web-console/pull/512)
* @vnys made their first contribution
## [4.6.2](https://github.com/equinor/radix-web-console/compare/v4.6.1..v4.6.2) - 2020-12-22

### 🐛 Bug Fixes

- Upgrade @fortawesome/fontawesome-free from 5.13.0 to 5.15.1 (#243) - ([f3bbc8b](https://github.com/equinor/radix-web-console/commit/f3bbc8b919f2e3a84c6365df3916d1692eb9b062)) by @snyk-bot in [#243](https://github.com/equinor/radix-web-console/pull/243)

- Upgrade history from 4.7.2 to 4.10.1 (#242) - ([1507dd3](https://github.com/equinor/radix-web-console/commit/1507dd30cb79e3435f4f58ee6728a0cd787e362c)) by @snyk-bot in [#242](https://github.com/equinor/radix-web-console/pull/242)

- Upgrade react-locky from 1.5.1 to 1.5.7 (#241) - ([7feb67f](https://github.com/equinor/radix-web-console/commit/7feb67f3db6681f476f905a0bb815a8e7eb85c07)) by @snyk-bot in [#241](https://github.com/equinor/radix-web-console/pull/241)

- Upgrade react-focus-lock from 1.17.6 to 1.19.1 (#240) - ([4a5c6e3](https://github.com/equinor/radix-web-console/commit/4a5c6e3e147acbca6ae9e6143ebba1849139864a)) by @snyk-bot in [#240](https://github.com/equinor/radix-web-console/pull/240)


## [4.3.1](https://github.com/equinor/radix-web-console/compare/v4.3.0..v4.3.1) - 2020-06-11

### 🐛 Bug Fixes

- Upgrade @fortawesome/react-fontawesome from 0.1.0-11 to 0.1.9 - ([1240a53](https://github.com/equinor/radix-web-console/commit/1240a53178f32c6a4984f2ea04ec73e7fb15b6fa)) by @snyk-bot


### 💼 Other

- Adds description of copy radixconfig.yaml step (#193) - ([47bc762](https://github.com/equinor/radix-web-console/commit/47bc762a37e30193e1752a7e3c3c1842b844166b)) by @keaaa in [#193](https://github.com/equinor/radix-web-console/pull/193)


## New Contributors ❤️

* @snyk-bot made their first contribution
* @dependabot[bot] made their first contribution
## [4.3.0](https://github.com/equinor/radix-web-console/compare/v4.2.1..v4.3.0) - 2020-03-13

### 💼 Other

- Secret status updated after save (#184) - ([e57440d](https://github.com/equinor/radix-web-console/commit/e57440d840dd7334c1ce96ae8f8bd3736f659cf2)) by @keaaa in [#184](https://github.com/equinor/radix-web-console/pull/184)

- Public links available on env card (#185) - ([c0e4508](https://github.com/equinor/radix-web-console/commit/c0e450867b22c2eda836e5d0fec797ed4e479954)) by @keaaa in [#185](https://github.com/equinor/radix-web-console/pull/185)

- Link to app AAD group (#187) - ([1d65bf6](https://github.com/equinor/radix-web-console/commit/1d65bf62b3b0fb93b693b9d1a55913534de172e4)) by @keaaa in [#187](https://github.com/equinor/radix-web-console/pull/187)

- Job triggered by fix (#188) - ([21c24d8](https://github.com/equinor/radix-web-console/commit/21c24d8f7abbf2a817da9aedb7238b462d412cba)) by @keaaa in [#188](https://github.com/equinor/radix-web-console/pull/188)


## New Contributors ❤️

* @JoakimHagen made their first contribution in [#183](https://github.com/equinor/radix-web-console/pull/183)
## [4.2.1](https://github.com/equinor/radix-web-console/compare/v4.2.0..v4.2.1) - 2020-02-10

### 💼 Other

- Last job time based on status (#169) - ([9a5c99a](https://github.com/equinor/radix-web-console/commit/9a5c99ae698ee0312b1510211449572d7237a2c7)) by @keaaa in [#169](https://github.com/equinor/radix-web-console/pull/169)

- Requests refresh token as part of oauth (#171) - ([cc06bef](https://github.com/equinor/radix-web-console/commit/cc06bef0dc05ef5b9763541cf163ce880a7891c8)) by @keaaa in [#171](https://github.com/equinor/radix-web-console/pull/171)

- Stop ongoing or queued jobs - ([df4acb5](https://github.com/equinor/radix-web-console/commit/df4acb5f8d0d3a50b9e5243227b3effcd02a30ce)) by @keaaa in [#172](https://github.com/equinor/radix-web-console/pull/172)

- Always allow to build/deploy from master (#176) - ([e5ec099](https://github.com/equinor/radix-web-console/commit/e5ec099537cbe134b6abc045cf138b98b2484396)) by @keaaa in [#176](https://github.com/equinor/radix-web-console/pull/176)


## [3.6.0](https://github.com/equinor/radix-web-console/compare/v3.5.2..v3.6.0) - 2019-11-19

### 💼 Other

- Support private image hub - ([0d9700b](https://github.com/equinor/radix-web-console/commit/0d9700bdbd8efcc925f774196e4099cffeb8e7d3)) by @keaaa in [#150](https://github.com/equinor/radix-web-console/pull/150)

- Disclaimer on US PoC cluster (#153) - ([2b7c7c6](https://github.com/equinor/radix-web-console/commit/2b7c7c65990e167d09ad9b81a24420da82b82bc8)) by @keaaa in [#153](https://github.com/equinor/radix-web-console/pull/153)


## [3.1.0](https://github.com/equinor/radix-web-console/compare/v3.0.1..v3.1.0) - 2019-07-11

### 💼 Other

- Guard against missing job in deployment - ([128f8ac](https://github.com/equinor/radix-web-console/commit/128f8ac04de32ebc8c24bb8a40f8813a4da25ff7)) by @nemzes


## [2.3.0](https://github.com/equinor/radix-web-console/compare/v2.2.6..v2.3.0) - 2019-04-25

### 💼 Other

- Support build only pipeline - ([f23646d](https://github.com/equinor/radix-web-console/commit/f23646d529f78b06388db0f9cc51567f9031300b)) by @keaaa in [#116](https://github.com/equinor/radix-web-console/pull/116)


## [2.1.0](https://github.com/equinor/radix-web-console/compare/v2.0.1..v2.1.0) - 2019-03-05

### 💼 Other

- Docs URL - ([4215b09](https://github.com/equinor/radix-web-console/commit/4215b09e7eedfbc959d632e017d0c62ee6e4b107)) by @nemzes


## New Contributors ❤️

* @ingeknudsen made their first contribution in [#102](https://github.com/equinor/radix-web-console/pull/102)
## [1.2.1](https://github.com/equinor/radix-web-console/compare/v1.2.0..v1.2.1) - 2019-01-29

### 💼 Other

- Route to job step is broken - ([a85dea8](https://github.com/equinor/radix-web-console/commit/a85dea81b099119e2c60cb478198441b14bbbf69)) by @nemzes


## [0.9.0](https://github.com/equinor/radix-web-console/compare/v0.8.2..v0.9.0) - 2018-12-06

### 💼 Other

- Component labels changed - ([69d9c0a](https://github.com/equinor/radix-web-console/commit/69d9c0a3698f5addc7982863b23a75e5897f0703)) by @nemzes


## [0.1.1] - 2018-08-29

## New Contributors ❤️

* @nemzes made their first contribution
* @matseda made their first contribution
* @ made their first contribution in [#5](https://github.com/equinor/radix-web-console/pull/5)
* @thezultimate made their first contribution
<!-- generated by git-cliff -->
