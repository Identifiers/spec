CREATE TABLE symbols (base128 CHAR(129), base32 CHAR(38));
INSERT INTO symbols (base128, base32) VALUES (
  '/0123456789?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ',
  '_0123456789abcdefghjkmnpqrstvwxyz*~$=u'
);
