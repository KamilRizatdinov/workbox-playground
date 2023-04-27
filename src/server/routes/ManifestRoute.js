import url from 'url';
import manifest from '../../../src/manifest.json';
import {version} from '../../../package.json';

export default class ManifestRoute {
  static asMiddleware() {
    return async (req, res) => {
      const host = req.get('host');

      const baseUrl = url.format({
        host,
        port: req.get('port'),
        protocol: 'http',
        pathname: '',
      });

      res.status(200).json({
        ...manifest,
        start_url: baseUrl,
        version,
        lang: 'ru',
      });
    };
  }
}
