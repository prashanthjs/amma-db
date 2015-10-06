
declare module "amma-db/index"{
    import tmp = require('index');
    export = tmp;
}

declare module "amma-db/services/db"{
    import tmp = require('services/db');
    export = tmp;
}

declare module "amma-db/test/unit-testing/services/db.test"{
    import tmp = require('test/unit-testing/services/db.test');
    export = tmp;
}

declare module "amma-db/node_modules/amma-plugin-loader/index"{
    import tmp = require('node_modules/amma-plugin-loader/index');
    export = tmp;
}

declare module "amma-db/node_modules/amma-plugin-loader/test/unit-testing/index.test"{
    import tmp = require('node_modules/amma-plugin-loader/test/unit-testing/index.test');
    export = tmp;
}

declare module "amma-db/node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/controller"{
    import tmp = require('node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/controller');
    export = tmp;
}

declare module "amma-db/node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/failure-run"{
    import tmp = require('node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/failure-run');
    export = tmp;
}

declare module "amma-db/node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/index"{
    import tmp = require('node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/index');
    export = tmp;
}

declare module "amma-db/node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/success-run"{
    import tmp = require('node_modules/amma-plugin-loader/test/unit-testing/test-sample-module/success-run');
    export = tmp;
}

declare module "amma-db"{
    import tmp = require('index');
    export = tmp;
}