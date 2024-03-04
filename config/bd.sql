CREATE TABLE `promotion_init` (
  `idally` bigint(20) NOT NULL,
  `image` VARCHAR(300) NOT NULL,
   `description` VARCHAR(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
   KEY (`idally`),
  CONSTRAINT `promotion_init` FOREIGN KEY (`idally`) REFERENCES `allies` (`idally`) ON DELETE CASCADE ON UPDATE CASCADE
  
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

CREATE TABLE `allies` (
  `idally` bigint(20) NOT NULL AUTO_INCREMENT,
  `ally` varchar(250) NOT NULL,
  `identification` varchar(12) NOT NULL,
  `whatsapp` varchar(12) NOT NULL,
  `apikey` varchar(20) DEFAULT NULL,
  `branch` varchar(500) DEFAULT NULL,
  `user` varchar(100) NOT NULL,
  `direction` varchar(500) DEFAULT NULL,
  `active` int(2) NOT NULL,
  `logo` varchar(250) DEFAULT NULL,
  `banners1` varchar(250) DEFAULT NULL,
  `banners2` varchar(250) DEFAULT NULL,
  `banners3` varchar(250) DEFAULT NULL,
  `directory` varchar(100) NOT NULL,
  `activeaki` int(2) NOT NULL,
  `positive` int(5) DEFAULT NULL,
  `negative` int(5) DEFAULT NULL,
  `neutral` int(5) DEFAULT NULL,
  `sales` int(5) DEFAULT NULL,
  `lat` varchar(50) DEFAULT NULL,
  `lgt` varchar(50) DEFAULT NULL,
  `mnuadmin` int(2) NOT NULL,
  `close` int(2) NOT NULL,
  `keyword` varchar(500) DEFAULT NULL,
   `limitpg` varchar(5) DEFAULT NULL,
    `offsetpg` varchar(5) DEFAULT NULL,
    `preference` INT(5) NOT NULL
   
  PRIMARY KEY (`idally`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci



CREATE TABLE `subcategory_ally_init` (
  `idally` bigint(20) NOT NULL,
  `idcategory` bigint(20) NOT NULL,
   `idsubcategory` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
PRIMARY KEY (`idally`,`idcategory`, `idsubcategory`),
  KEY `idcategory` (`idcategory`),
    KEY `idsubcategory` (`idsubcategory`),
 FOREIGN KEY (`idally`) REFERENCES `allies` (`idally`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`idsubcategory`) REFERENCES `subcategories_init` (`idsubcategory`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`idcategory`) REFERENCES `categories_init` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci





/*
SELECT
        CONVERT(b.idally, char) as idally, 
        b.ally, 
        b.identification, 
        b.whatsapp,
        b.apikey,
        b.branch, 
        b.user, 
        b.direction, 
        CONVERT(b.active, char) as active, 
        b.logo, 
        b.banners1, 
        b.banners2, 
        b.banners3, 
        b.directory, 
        CONVERT( b.activeaki , char) as activeaki, 
        CONVERT(b.positive  , char) as positive, 
        CONVERT(b.negative  , char) as negative, 
        CONVERT(b.neutral  , char) as neutral, 
        CONVERT(b.sales , char) as sales, 
        b.lat, 
        b.lgt, 
        CONVERT(b.mnuadmin  , char) as mnuadmin, 
        CONVERT( b.close , char) as close,
        b.keyword,
            CONCAT('[',

                GROUP_CONCAT(

                JSON_OBJECT(

                    'idsubcategory', CONVERT(d.idsubcategory, char),

                    'subcategory', d.subcategory,
                    'image', d.image,
                    'active', CONVERT(d.active, char))

                ),

        ']') AS subcategory
            
        FROM 
            allies b
        
        INNER JOIN subcategory_ally_init c
        ON c.idally = b.idally
        INNER JOIN subcategories_init d
        ON d.idsubcategory = c.idsubcategory
        WHERE  
            LOWER(b.ally) LIKE '%pa%' AND b.active = 1 AND b.activeaki=1 OR 
            LOWER(d.subcategory) LIKE '%pa%'  AND b.active = 1 AND b.activeaki=1 OR 
            LOWER(b.branch) LIKE '%pa%'  AND b.active = 1 AND b.activeaki=1 OR
            LOWER(b.keyword) LIKE '%pa%'  AND b.active = 1 AND b.activeaki=1

            

        GROUP BY b.idally;

*/


CREATE TABLE `categories_PONER AQUI DIRECTORIO DEL ALIADO` (
  `idcategory` bigint(20) NOT NULL AUTO_INCREMENT,
  `category` varchar(150) NOT NULL,
  `description` VARCHAR(250) NULL,
  `image` varchar(255) DEFAULT NULL,
  `active` bigint(20) NOT NULL,
  `pref` INT(2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idcategory`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

CREATE TABLE `subcategories_PONER AQUI DIRECTORIO DEL ALIADO` (
  `idsubcategory` bigint(20) NOT NULL AUTO_INCREMENT,
  `subcategory` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `idcategory` bigint(20) NOT NULL,
  `image` varchar(200) NOT NULL,
  `active` int(2)  NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idsubcategory`),
  KEY `idsubcategory` (`idsubcategory`),
  CONSTRAINT `subcategories_todoaki` FOREIGN KEY (`idcategory`) REFERENCES `categories_todoaki` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci

CREATE TABLE `products_PONER AQUI DIRECTORIO DEL ALIADO` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(180) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `idcategory` bigint(20) NOT NULL,
  `stock` int(11) NOT NULL,
  `image1` varchar(200) NOT NULL,
  `image2` varchar(200)  NULL,
  `image3` varchar(200)  NULL,
  `active` int(2)  NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idcategory` (`idcategory`),
  CONSTRAINT `products_todoaki` FOREIGN KEY (`idcategory`) REFERENCES `categories_todoaki` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci



CREATE TABLE `preferences_Nombre del directori` (
  `idpreference` bigint(20) NOT NULL AUTO_INCREMENT,
  `idproduct` bigint(20) NOT NULL,
  `idcategory` bigint(20) NOT NULL,
  PRIMARY KEY (`idpreference`),
  KEY `idpreference` (`idpreference`),
  CONSTRAINT `pk_preferences_todoaki` FOREIGN KEY (`idproduct`) REFERENCES `products_todoaki` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
     CONSTRAINT `preferences_todoaki` FOREIGN KEY (`idcategory`) REFERENCES `categories_todoaki` (`idcategory`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci


CREATE TABLE `subpreferences_Nombre del ` (
  `idsubpreference` bigint(20) NOT NULL AUTO_INCREMENT,
  `idpreference` bigint(20) NOT NULL,
  `idsubcategory` bigint(20) NOT NULL

  PRIMARY KEY (`idsubpreference`),
  KEY `idsubpreference` (`idsubpreference`),
  CONSTRAINT `pk_subpreferences_todoaki` FOREIGN KEY (`idpreference`) REFERENCES `preferences_todoaki` (`idpreference`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `subpreferences_todoaki` FOREIGN KEY (`idsubcategory`) REFERENCES `subcategories_todoaki` (`idsubcategory`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci




CREATE TABLE type_Payments (
    idpago bigint(3) NOT NULL AUTO_INCREMENT,
    pago varchar(60) NOT NULL,
    description text  NULL,
    image text NULL,
    active bigint(2),
    PRIMARY KEY (idpago)
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci


CREATE TABLE payments_todoaki (
    idpayment bigint(3) NOT NULL AUTO_INCREMENT,
    idpago bigint(3) NOT NULL ,
    PRIMARY KEY (idpago),
    KEY idpayment (idpayment),
    CONSTRAINT pk_payments_todoaki FOREIGN KEY (idpago) REFERENCES type_payments (idpago) ON DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci




