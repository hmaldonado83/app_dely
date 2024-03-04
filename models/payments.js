const db = require('../config/config');


const PaymentsStore = {};



PaymentsStore.getPayments = (params, result) => {

    const sql =
    `
    SELECT 
	CONVERT(a.idpago, char) as idpago, a.pago, a.description, a.image, 
    CASE WHEN b.idpayment IS NULL THEN '0' ELSE CONVERT(b.idpayment, char)  END AS idpayment,
        CASE WHEN b.idpayment IS NULL THEN '0' ELSE '1' END AS active
        FROM type_payments a
        LEFT JOIN payments_${params.directory} b 
        ON a.idpago = b.idpago where a.active = 1`;

    db.query(
        sql,
        (err, payments) => {
            if (err){
                result(err, null)
            }else {
                result(null, payments)
            }
        }
    )

}



module.exports = PaymentsStore;



