// GENERADO por scripts/import-price-rules.mjs a partir de result-100,json (export real del
// listado de Grupo Venado). Distribuidoras/marcas/clientes se infirieron por texto — ver el
// comentario del script para el detalle de qué es dato real y qué es heurística.
// No editar a mano: volver a correr el script si llega un export más nuevo.
import type { PriceRule } from "../types"

export const VENADO_PRICE_RULES: PriceRule[] = [
  {
    "id": 239145,
    "company": "IVSA",
    "name": "DESCUENTO NIVEL SANTA CRUZ 90% - 1786987026707 - 1787689998962",
    "description": "DESCUENTO NIVEL SANTA CRUZ 90%",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_AMOUNT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2026-08-17T13:07:33",
    "updatedAt": "2026-08-17T13:07:33",
    "value": 90
  },
  {
    "id": 239144,
    "company": "IVSA",
    "name": "SUPER OFERTON MEGA OFERTON DE SEPTIEMBRE - 1787689996031",
    "description": "SUPER OFERTON MEGA OFERTON DE SEPTIEMBRE",
    "fromDate": "2026-08-24",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2026-08-24T16:13:41",
    "updatedAt": "2026-08-24T16:13:41",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239143,
    "company": "IVSA",
    "name": "SUPER OFERTON MEGA OFERTON DE SEPTIEMBRE",
    "description": "SUPER OFERTON MEGA OFERTON DE SEPTIEMBRE",
    "fromDate": "2026-08-24",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2026-08-24T16:13:41",
    "updatedAt": "2026-08-24T16:13:41",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239142,
    "company": "IVSA",
    "name": "SALSAS KRIS DESCUENTAZO",
    "description": "SALSAS KRIS DESCUENTAZO",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "ENABLE",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239142",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "angel.franco",
    "createdAt": "2026-08-17T14:07:07",
    "updatedAt": "2026-08-17T14:07:07",
    "value": 5
  },
  {
    "id": 239141,
    "company": "IVSA",
    "name": "DESCUENTO NIVEL SANTA CRUZ 90% - 1786987026707",
    "description": "DESCUENTO NIVEL SANTA CRUZ 90%",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "ENABLE",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_AMOUNT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-08-17T13:07:33",
    "updatedAt": "2026-08-17T13:07:33",
    "value": 90
  },
  {
    "id": 239140,
    "company": "IVSA",
    "name": "DESCUENTO NIVEL SANTA CRUZ 90%",
    "description": "DESCUENTO NIVEL SANTA CRUZ 90%",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_AMOUNT",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-08-17T13:07:33",
    "updatedAt": "2026-08-17T13:07:33",
    "value": 90
  },
  {
    "id": 239139,
    "company": "IVSA",
    "name": "MEGA REGALO DE PRODUCTOS PRUEBA",
    "description": "MEGA REGALO DE PRODUCTOS PRUEBA",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2026-08-17T10:43:48",
    "updatedAt": "2026-08-17T10:43:48",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239138,
    "company": "IVSA",
    "name": "MEGA BONIFICACION DE PRODUCTOS",
    "description": "MEGA BONIFICACION DE PRODUCTOS",
    "fromDate": "2026-08-17",
    "thruDate": "2026-09-17",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2026-08-17T10:33:35",
    "updatedAt": "2026-08-17T10:33:35",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239137,
    "company": "IVSA",
    "name": "SUPER DESCUENTAZO JUANCHITO - SOLO AGOSTO",
    "description": "JUANCHITO - SUPER PROMO JUANCHITO AGO-SEP",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-24",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "ernesto.montero",
    "createdAt": "2026-08-17T10:04:17",
    "updatedAt": "2026-08-17T10:04:17",
    "value": 5
  },
  {
    "id": 239136,
    "company": "IVSA",
    "name": "JUANCHITO - SUPER PROMO JUANCHITO AGO-SEP",
    "description": "JUANCHITO - SUPER PROMO JUANCHITO AGO-SEP",
    "fromDate": "2026-08-17",
    "thruDate": "2026-09-17",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "RESTRICTED",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2026-08-17T10:00:30",
    "updatedAt": "2026-08-17T10:00:30",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239135,
    "company": "IVSA",
    "name": "PACK JUANCHO - SALSAS AGOSTO-SEPTIEMBRE",
    "description": "PACK JUANCHO - SALSAS AGOSTO-SEPTIEMBRE",
    "fromDate": "2026-08-17",
    "thruDate": "2026-09-17",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2026-08-17T09:57:18",
    "updatedAt": "2026-08-17T09:57:18",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239134,
    "company": "VEMASSA",
    "name": "JUGOS DE TEMPORADA - AGOSTO 2026",
    "description": "JUGOS DE TEMPORADA - AGOSTO 2026",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-24",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-08-17T09:26:32",
    "updatedAt": "2026-08-17T09:26:32",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239133,
    "company": "IVSA",
    "name": "DESCUENTO POLVOS AGOSTO",
    "description": "DESCUENTO POLVOS AGOSTO",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "ENABLE",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-08-17T09:04:03",
    "updatedAt": "2026-08-17T09:04:03",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239132,
    "company": "IVSA",
    "name": "TEST",
    "description": "TEST",
    "fromDate": "2026-08-17",
    "thruDate": "2026-08-17",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2026-08-17T08:56:58",
    "updatedAt": "2026-08-17T08:56:58",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239092,
    "company": "IVSA",
    "name": "SALSAS - PERSONAL - CBBA - AGO 2026 - KETCHUP",
    "description": "SALSAS - PERSONAL - CBBA - AGO 2026 - KETCHUP",
    "fromDate": "2026-08-14",
    "thruDate": "2026-08-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "ENABLE",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-08-14T13:26:51",
    "updatedAt": "2026-08-14T13:26:51",
    "value": 5
  },
  {
    "id": 239087,
    "company": "IVSA",
    "name": "DESCUENTO-CLIENTE PUNTUAL/TRIOS SAN JUAN  2%  - 1776952460671 - 1777315398874",
    "description": "DESCUENTO- CLIENTE PUNTUAL /TRIOS SAN JUAN",
    "fromDate": "2026-04-14",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "sergio.rosso",
    "createdAt": "2025-12-18T17:50:46",
    "updatedAt": "2025-12-18T17:50:46",
    "value": 2
  },
  {
    "id": 239086,
    "company": "IVSA",
    "name": "ERROR - 1776096119825 - 1777314220068 - 1777314250996",
    "description": "ERROR - 1776096119825 - 1777314220068 - 1777314250996",
    "fromDate": "2026-04-21",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2024-02-09T10:49:30",
    "updatedAt": "2024-02-09T10:49:30",
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239085,
    "company": "IVSA",
    "name": "LIMPIEZA PACK VAJILLERO 1050+600ML  (TRADICIONAL EA)(COMPENSACIÓN) - 1777314220068",
    "description": "LIMPIEZA-B2C-EA-TRAD/PROV-ABR26-PACK VAJILLERO 1050+600ML (600+90) - ACUMULABLE – 5%",
    "fromDate": "2026-04-27",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2024-02-09T10:49:30",
    "updatedAt": "2024-02-09T10:49:30",
    "frequency": 600,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 90
    }
  },
  {
    "id": 239084,
    "company": "IVSA",
    "name": "CANAL  INSTITUCIONES SCZ CLIENTES PUNTUALES (ES SAN SILVESTRE).",
    "description": "BONIFICACION 10+1 LAVAVAJILLAS LIMON PULPIN 1050G LIMPIEZA, LAVAVAJILLAS",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-02",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239084",
        "type": "MARCA",
        "code": "MARCA-23",
        "name": "Pulpin"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-01-29T08:30:12",
    "updatedAt": "2026-01-29T08:30:12",
    "frequency": 10,
    "bonusProduct": {
      "code": "MARCA-23",
      "name": "Producto Pulpin (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239083,
    "company": "IVSA",
    "name": "LIPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 INSECTICIDAS SURTIDOS (RINCONADA SRL)",
    "description": "LIPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 INSECTICIDAS SURTIDOS (RINCONADA SRL)",
    "fromDate": "2026-04-27",
    "thruDate": "2026-07-06",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [
      {
        "id": "c239083",
        "type": "CLIENTE",
        "code": "200002",
        "name": "Rinconada SRL"
      }
    ],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2025-07-23T09:45:58",
    "updatedAt": "2025-07-23T09:45:58",
    "frequency": 6,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239082,
    "company": "IVSA",
    "name": "LIPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 ESPONJAS BRISTAR (RINCONADA SRL)",
    "description": "LIPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 ESPONJAS BRISTAR (RINCONADA SRL)",
    "fromDate": "2026-04-27",
    "thruDate": "2026-07-06",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [
      {
        "id": "c239082",
        "type": "CLIENTE",
        "code": "200002",
        "name": "Rinconada SRL"
      }
    ],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239082",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2025-07-23T09:45:58",
    "updatedAt": "2025-07-23T09:45:58",
    "frequency": 6,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239081,
    "company": "IVSA",
    "name": "LIMPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 AMBIENTADOR SPRAY SURTIDO (RINCONADA SRL)",
    "description": "LIMPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 AMBIENTADOR SPRAY SURTIDO (RINCONADA SRL)",
    "fromDate": "2026-04-27",
    "thruDate": "2026-07-06",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [
      {
        "id": "c239081",
        "type": "CLIENTE",
        "code": "200002",
        "name": "Rinconada SRL"
      }
    ],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2025-07-23T09:45:58",
    "updatedAt": "2025-07-23T09:45:58",
    "frequency": 6,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239080,
    "company": "IVSA",
    "name": "LIMPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 GUANTES MULTIUSO T- S,M,L (RINCONADA SRL)",
    "description": "LIMPIEZA CANAL B2B-INST ABR,MAY,JUN 2026 BONIF. 6+1 GUANTES MULTIUSO T- S,M,L (RINCONADA SRL)",
    "fromDate": "2026-04-27",
    "thruDate": "2026-07-06",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [
      {
        "id": "c239080",
        "type": "CLIENTE",
        "code": "200002",
        "name": "Rinconada SRL"
      }
    ],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2025-07-23T09:45:58",
    "updatedAt": "2025-07-23T09:45:58",
    "frequency": 6,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239079,
    "company": "IVSA",
    "name": "LIMPIEZA-NEG-B2C-SCZ-DH-ABRIL-JUNIO 26- MIX INSECTICIDAS (60+6) x VOLUMEN",
    "description": "LIMPIEZA DH SCZ - ABRIL-JUNIO 2026",
    "fromDate": "2026-04-27",
    "thruDate": "2026-07-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2025-05-30T16:44:41",
    "updatedAt": "2025-05-30T16:44:41",
    "frequency": 60,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 6
    }
  },
  {
    "id": 239078,
    "company": "IVSA",
    "name": "CULINARIOS ACEITE DE OLIVA 500 ML (FECHA CORTA).",
    "description": "CULINARIOS-NEG-B2C-LP-TRAD/PROV ABRIL. 26 CULINARIOS ACEITE DE OLIVA 500 ML - 3 UNI + 1 UN",
    "fromDate": "2026-04-27",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2023-05-04T16:09:43",
    "updatedAt": "2023-05-04T16:09:43",
    "frequency": 3,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239077,
    "company": "IVSA",
    "name": "CULINARIOS ACEITE DE OLIVA 1000 ML (FECHA CORTA)",
    "description": "CULINARIOS-NEG-B2C-LP-TRAD/PROV ABRIL. 26 CULINARIOS ACEITE DE OLIVA 1000 ML - 3 UNI + 1 UN",
    "fromDate": "2026-04-27",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2023-05-04T16:09:43",
    "updatedAt": "2023-05-04T16:09:43",
    "frequency": 3,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239076,
    "company": "IVSA",
    "name": "CULINARIOS ACEITE DE OLIVA 1000 ML (FECHAS CORTAS) - 1777308227494",
    "description": "CULINARIOS-NEG-B2C-EA-TRAD/PROV-ABR26- ACEITE DE OLIVA 1000 ML (3+1) - NO ACUMULABLE – 33.33 %",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-31",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2023-05-05T00:21:34",
    "updatedAt": "2023-05-05T00:21:34",
    "frequency": 3,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239075,
    "company": "IVSA",
    "name": "CULINARIOS ACEITE DE OLIVA 500 ML - 1777308220163",
    "description": "CULINARIOS-NEG-B2C-EA-TRAD/PROV-ABR26-ACEITE DE OLIVA 500 ML (3+1) - NO ACUMULABLE – 33.33 %",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-31",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2023-05-05T00:21:34",
    "updatedAt": "2023-05-05T00:21:34",
    "frequency": 3,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239074,
    "company": "VEMASSA",
    "name": "LIMPIEZA PACK BRISPACK CANGURO (VOLUMEN 2) (ACCION ADICIONAL) - 1777304350014",
    "description": "LIMPIEZA-NEG-B2C-EA-TRAD/PROV-ABR-JUN26-PACK BRISPACK CANGURO (50+15)  NO ACUMULABLE - 30%",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-02",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239074",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2022-10-05T10:50:47",
    "updatedAt": "2022-10-05T10:50:47",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 15
    }
  },
  {
    "id": 239073,
    "company": "IVSA",
    "name": "LIMPIEZA - B2C -B2B - ABR-JUN2026- VAJILLERO BRISTAR DOYPACK 1 LT- 6 CAJAS + 1 CAJA",
    "description": "LIMPIEZA - B2C -B2B - ABR-JUN2026- VAJILLERO BRISTAR DOYPACK 1 LT- 6 CAJAS + 1 CAJA",
    "fromDate": "2026-04-27",
    "thruDate": "2026-06-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239073",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2023-06-23T11:02:04",
    "updatedAt": "2023-06-23T11:02:04",
    "frequency": 6,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239072,
    "company": "IVSA",
    "name": "LIMPIEZA - B2C -CTE PUNTUAL- ABR 2026 - DOYPACK LIMPIA PISO 900 ml 60 uni + 9 uni NO ACUM",
    "description": "LIMPIEZA - B2C -CTE PUNTUAL- ABR 2026 - DOYPACK LIMPIA PISO 900 ml 60 uni + 9 uni NO ACUM",
    "fromDate": "2026-04-27",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2023-08-08T09:09:25",
    "updatedAt": "2023-08-08T09:09:25",
    "frequency": 60,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 9
    }
  },
  {
    "id": 239071,
    "company": "IVSA",
    "name": "SALSAS KRIS 47 ML MIX (POR CLIENTE-3)",
    "description": "SALSAS-CTE-B2C-LP-TRAD/PROV ABRIL. 26 SALSA KRIS 47 ML MIX - 200 UNI + 28 UN",
    "fromDate": "2026-04-27",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239071",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2023-05-04T17:06:46",
    "updatedAt": "2023-05-04T17:06:46",
    "frequency": 200,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 28
    }
  },
  {
    "id": 239070,
    "company": "IVSA",
    "name": "LIMPIEZA PACK BRISPACK CANGURO (ACCIONES DE CIERRE).",
    "description": "LIMPIEZA-B2C-LP-TRAD/PROV ABR/MAY/JUN. 25 PACK BRISPACK CANGURO (50+15) - NO ACUMULABLE - 30%",
    "fromDate": "2026-04-27",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239070",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2023-01-06T13:01:30",
    "updatedAt": "2023-01-06T13:01:30",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 15
    }
  },
  {
    "id": 239069,
    "company": "IVSA",
    "name": "CULINARIOS - PERSONAL - SCR - ABR - MAY 2026 - DECT 50% ATUN PRODUCTO NO CONFORME VENTA  AL PERSONAL",
    "description": "CULINARIOS - PERSONAL - SCR - ABR - MAY 2026 - DECT 50% ATUN PRODUCTO NO CONFORME VENTA  AL PERSONAL",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-10",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "genaro.valverde",
    "createdAt": "2026-04-27T10:15:45",
    "updatedAt": "2026-04-27T10:15:45",
    "value": 50
  },
  {
    "id": 239068,
    "company": "FACRULESA",
    "name": "PANIFICACION - B2B - PANADERIA Y PASTELERIA - EA - ABR 26 - LEVADURA FRESCA 500 GR - 10+1 - 1777298852315",
    "description": "PANIFICACION - B2B - PANADERIA Y PASTELERIA - EA - ABR 26 - LEVADURA FRESCA 500 GR - 10+1- PANADERIA INGAVI",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-04",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239068",
        "type": "MARCA",
        "code": "MARCA-77",
        "name": "Ingavi"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2024-11-04T16:32:40",
    "updatedAt": "2024-11-04T16:32:40",
    "frequency": 10,
    "bonusProduct": {
      "code": "MARCA-77",
      "name": "Producto Ingavi (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239067,
    "company": "IVSA",
    "name": "ALIMENTOS - B2B - PANADERIA Y PASTELERIA - EA - ABR 26- DESCUENTO (5%) - INGAVI",
    "description": "ALIMENTOS - B2B - PANADERIA Y PASTELERIA - EA - ABR 26 - DESCUENTO (5%) - PANADERIA INGAVI",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-04",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239067",
        "type": "MARCA",
        "code": "MARCA-77",
        "name": "Ingavi"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "ernesto.montero",
    "createdAt": "2023-05-02T14:46:30",
    "updatedAt": "2023-05-02T14:46:30",
    "value": 5
  },
  {
    "id": 239066,
    "company": "IVSA",
    "name": "DESCUENTO-CLIENTE PUNTUAL/TRIOS SAN JUAN  4%  - 1776952367663 - 1777294909553",
    "description": "DESCUENTO- CLIENTE PUNTUAL /TRIOS SAN JUAN",
    "fromDate": "2026-04-14",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "sergio.rosso",
    "createdAt": "2025-12-18T17:50:46",
    "updatedAt": "2025-12-18T17:50:46",
    "value": 4
  },
  {
    "id": 239065,
    "company": "IVSA",
    "name": "CULINARIOS - PERSONAL - TJA - ABR - MAY 2026 - ATUN EL PESCADOR DESCUENTO 50% PERSONAL",
    "description": "CULINARIOS - PERSONAL - TJA - ABR - MAY 2026 - ATUN EL PESCADOR DESCUENTO 50% PERSONAL",
    "fromDate": "2026-04-27",
    "thruDate": "2026-05-31",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      4
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239065",
        "type": "MARCA",
        "code": "MARCA-68",
        "name": "El Pescador"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "angel.franco",
    "createdAt": "2026-04-27T09:00:55",
    "updatedAt": "2026-04-27T09:00:55",
    "value": 50
  },
  {
    "id": 239064,
    "company": "IVSA",
    "name": "LIMPIEZA-B2B-SCZ-TRAD/PROV/FRONT- ABRIL 2026 - PACK VAJILLERO+CUBIERTOS (4+1)  - 1777294522435",
    "description": "PACK VAJILLEROS +CUBIERTOS (4+1)",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2025-10-15T14:18:04",
    "updatedAt": "2025-10-15T14:18:04",
    "frequency": 4,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239063,
    "company": "IVSA",
    "name": "LIMPIEZA VAJILLERO PULPIN DOYPACK 1000 ML (ACCIONES POR COMPENSACION)",
    "description": "LIMPIEZA-B2C-LP-TRAD/PROV ABRIL 26 VAJILLERO DOYPACK PULPIN 1050 ML (50+10) - NO ACUMULABLE – 20%",
    "fromDate": "2026-04-17",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239063",
        "type": "MARCA",
        "code": "MARCA-23",
        "name": "Pulpin"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2023-05-04T13:27:34",
    "updatedAt": "2023-05-04T13:27:34",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-23",
      "name": "Producto Pulpin (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239062,
    "company": "VEMASSA",
    "name": "BEBIDAS-CTE-B2C-SCZ-DH-ABRIL26-DE LA GRANJA 2 LT NARANJA - (16 UN +3 UN) TERESA",
    "description": "BEBIDAS DH SCZ ABRIL_26",
    "fromDate": "2026-04-25",
    "thruDate": "2026-05-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239062",
        "type": "MARCA",
        "code": "MARCA-45",
        "name": "De La Granja"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2025-06-02T12:22:39",
    "updatedAt": "2025-06-02T12:22:39",
    "frequency": 16,
    "bonusProduct": {
      "code": "MARCA-45",
      "name": "Producto De La Granja (bonificación)",
      "unit": "UN",
      "qty": 3
    }
  },
  {
    "id": 239061,
    "company": "VEMASSA",
    "name": "BEBIDAS-NEG-B2C-SCZ-DH-ABRIL-26-MIX FRUSSION/CHICHA/MOCOCHINCHI  - 5 UN +1 UN MIX CASA DEL CAMBA",
    "description": "BEBIDAS DH SCZ ABRIL_26",
    "fromDate": "2026-02-11",
    "thruDate": "2026-05-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2025-04-02T17:13:21",
    "updatedAt": "2025-04-02T17:13:21",
    "frequency": 5,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239060,
    "company": "VEMASSA",
    "name": "BEBIDAS-NEG-B2C-SCZ-DH-ABRIL-26-DLG NARANJA/POMELO  - 6 UN +1 UN",
    "description": "BEBIDAS DH SCZ ABRIL_26",
    "fromDate": "2026-02-11",
    "thruDate": "2026-05-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239060",
        "type": "MARCA",
        "code": "MARCA-45",
        "name": "De La Granja"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2025-04-02T17:13:21",
    "updatedAt": "2025-04-02T17:13:21",
    "frequency": 6,
    "bonusProduct": {
      "code": "MARCA-45",
      "name": "Producto De La Granja (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239059,
    "company": "VEMASSA",
    "name": "BEBIDAS-CTE-B2C-SCZ-DH-ABRIL26-DE LA GRANJA 2 LT NARANJA - (16 UN +3 UN) PAULINA QUIROGA",
    "description": "BEBIDAS DH SCZ ABRIL_26",
    "fromDate": "2026-04-25",
    "thruDate": "2026-05-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239059",
        "type": "MARCA",
        "code": "MARCA-45",
        "name": "De La Granja"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2025-06-02T12:22:39",
    "updatedAt": "2025-06-02T12:22:39",
    "frequency": 16,
    "bonusProduct": {
      "code": "MARCA-45",
      "name": "Producto De La Granja (bonificación)",
      "unit": "UN",
      "qty": 3
    }
  },
  {
    "id": 239058,
    "company": "VEMASSA",
    "name": "LIMPIEZA-NEG-B2C-EAL-DH-ABR-JUN26 - 1777130780757",
    "description": "DETERGENTE BRISTAR 150  24 + 1",
    "fromDate": "2026-04-25",
    "thruDate": "2026-07-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      10
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239058",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2022-10-02T22:11:13",
    "updatedAt": "2022-10-02T22:11:13",
    "frequency": 24,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239057,
    "company": "VEMASSA",
    "name": "LIMPIEZA-NEG-B2C-EAL-DH-ABR-JUN26  - 1777130718487",
    "description": "DETERGENTE BRISTAR 150  60 + 5",
    "fromDate": "2026-04-25",
    "thruDate": "2026-07-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      10
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239057",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2022-10-02T22:11:13",
    "updatedAt": "2022-10-02T22:11:13",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 5
    }
  },
  {
    "id": 239056,
    "company": "IVSA",
    "name": "CANAL INSTITUCIONES CLIENTES PUNTUALES (INSTITUCIONES)",
    "description": "BONIFICACION 8+1 DETERGENTE POLVO LIMON BRISTAR BOLSA 5 KG BRISTAR, LIMPIEZA",
    "fromDate": "2026-04-25",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239056",
        "type": "MARCA",
        "code": "MARCA-31",
        "name": "Bristar"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-01-13T14:53:08",
    "updatedAt": "2026-01-13T14:53:08",
    "frequency": 8,
    "bonusProduct": {
      "code": "MARCA-31",
      "name": "Producto Bristar (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239055,
    "company": "VEMASSA",
    "name": "Descuento PROVINCIA - ABRIL 2026 - 6% - TRIOS SAN JUAN:",
    "description": "Descuento 6% PROVINCIA - Desc ABRIL - MONTERO",
    "fromDate": "2026-04-25",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "genaro.valverde",
    "createdAt": "2022-10-18T12:34:52",
    "updatedAt": "2022-10-18T12:34:52",
    "value": 6
  },
  {
    "id": 239054,
    "company": "IVSA",
    "name": "LIMPIEZA-TRA/PRO/FRO-ABRIL25- LAVAVAJILLAS PULPIN - (600+90) - 15%- 1777126073441",
    "description": "LIMPIEZA- LAVAVAJILLAS PULPIN (600+90)",
    "fromDate": "2026-04-25",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239054",
        "type": "MARCA",
        "code": "MARCA-23",
        "name": "Pulpin"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2025-05-02T05:57:10",
    "updatedAt": "2025-05-02T05:57:10",
    "frequency": 600,
    "bonusProduct": {
      "code": "MARCA-23",
      "name": "Producto Pulpin (bonificación)",
      "unit": "UN",
      "qty": 90
    }
  },
  {
    "id": 239053,
    "company": "IVSA",
    "name": "SALSAS - NEG - B2B - SCZ - GASTRO - ABR  26  - MAYONESA REAL SOBRE 9CC - 5+1   - 1777070979775",
    "description": "SALSAS - NEG - B2B - SCZ - GASTRO - ABR  26  - MAYONESA REAL SOBRE 9CC - 5+1",
    "fromDate": "2026-04-01",
    "thruDate": "2026-06-02",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239053",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2024-12-01T20:49:52",
    "updatedAt": "2024-12-01T20:49:52",
    "frequency": 5,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239052,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KETCHUP REAL 500ML 50CJS+10.5CJS 21% rgg  - 1775064466548 - 1777062350707",
    "description": "KETCHUP REAL 500ML (50+10.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239052",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 11
    }
  },
  {
    "id": 239051,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA REAL 500ML 50CJS+10.5CJS 21%  rgg  - 1775062758435 - 1777062289799",
    "description": "MAYONESA REAL 500ML (50+10.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239051",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 11
    }
  },
  {
    "id": 239050,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KETCHUP REAL 4KG 50CJS+11CJS 22%   rgg - 1775064841503 - 1777062215822",
    "description": "KETCHUP REAL 4KG (50+11)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239050",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 11
    }
  },
  {
    "id": 239049,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA REAL 4KG 50CJS+11CJS 22%  rgg- 1775064702564 - 1777062149746",
    "description": "MAYONESA REAL 4KG (50+11)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239049",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 11
    }
  },
  {
    "id": 239048,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABRI26-KETCHUP REAL 1000ML 50CJS+12CJS 24% rgg - 1775057212848 - 1777062073727",
    "description": "KETCHUP REAL 1000ML (50+12)",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239048",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 12
    }
  },
  {
    "id": 239047,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA REAL 1000ML 50CJS+12CJS 24%  rgg - 1775056939249 - 1777062002974",
    "description": "MAYONESA REAL 1000ML (50+12)",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239047",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 12
    }
  },
  {
    "id": 239046,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KETCHUP REAL 2900ML 50CJS+12CJS 24%   rgg - 1775055777738 - 1777061903527",
    "description": "KETCHUP REAL 2900ML (50+12)",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239046",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 12
    }
  },
  {
    "id": 239045,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA REAL 2900ML 50CJS+12CJS 24%   rgg -1775055542963 - 1777061831096",
    "description": "MAYONESA REAL 2900ML (50+12)",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239045",
        "type": "MARCA",
        "code": "MARCA-12",
        "name": "Real"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-12",
      "name": "Producto Real (bonificación)",
      "unit": "UN",
      "qty": 12
    }
  },
  {
    "id": 239044,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KET/MOS KRIS 4KG 50CJS9.5CJS 19% rgg - 1775062251154 - 1777061737343",
    "description": "KETCHUP(MOSTAZA KRIS 4KG (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239044",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239043,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA KRIS 4KG 50CJS+9.5CJS 19%  rgg- 1775062120452 - 1777061588604",
    "description": "MAYONESA KRIS 4KG (50+9.5)",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239043",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239042,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KET/MOS KRIS 480GR 50CJS+9.5CJS 19%  rgg - 1775061968926 - 1777060860542",
    "description": "KETCHUP/MOSTAZA KRIS 480G (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239042",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239041,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KET/MOS KRIS 480GR 50CJS+9.5CJS 19%  rgg - 1775061968926 - 1777060841039",
    "description": "KETCHUP/MOSTAZA KRIS 480G (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239041",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239040,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA KRIS 480GR 50CJS+9.5CJS 19% rgg - 1775061834668 - 1777060688621",
    "description": "MAYONESA KRIS 480G (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239040",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239039,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KET/MOS KRIS 980GR 50CJS+9,5CJS 19% rgg - 1775061324406 -1777060574941",
    "description": "KETCHUP/MOSTAZA KRIS 980G (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239039",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239038,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA KRIS 980GR 50CJS+9.5CJS 19% rgg- 1775058669654 - 1777060490949",
    "description": "MAYONESA KRIS 980G (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239038",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239037,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-MAYONESA KRIS 2900ML 50CJS+9,5CJS 19%  rgg - 1775061513519 - 1777060345253",
    "description": "MAYONESA KRIS 2900ML (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239037",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239036,
    "company": "IVSA",
    "name": "SALSAS-CTE-B2C-SCZ-TRAD-ABR26-KET/MOS KRIS 2900ML 50CJS+9.5CJS 17%  rgg - 1775061683155 - 1777060199121",
    "description": "KETCHUP/MOSTAZA KRIS 2900ML (50+9.5)",
    "fromDate": "2026-04-16",
    "thruDate": "2026-04-24",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239036",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-01-08T11:33:10",
    "updatedAt": "2026-01-08T11:33:10",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239035,
    "company": "IVSA",
    "name": "LIMPIEZA-NEG-B2B-SCZ-PANADERIA-ABRIL-JUNIO 26- PACK LAVAVAJILLA 1050 ML+COLORES 4+1",
    "description": "PACK LAVAVAJILLA 1050 ML+COLORES 4+1",
    "fromDate": "2026-04-24",
    "thruDate": "2026-06-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2025-05-30T16:44:41",
    "updatedAt": "2025-05-30T16:44:41",
    "frequency": 4,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239034,
    "company": "VEMASSA",
    "name": "BEBIDAS-CTE-B2C-SCZ-DH-ABRIL26-DE LA GRANJA 2 LT NARANJA - (16 UN +3 UN) AURELIO MONTAÑO GUTIERREZ",
    "description": "BEBIDAS DH SCZ ABRIL_26",
    "fromDate": "2026-04-24",
    "thruDate": "2026-05-03",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239034",
        "type": "MARCA",
        "code": "MARCA-45",
        "name": "De La Granja"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2025-06-02T12:22:39",
    "updatedAt": "2025-06-02T12:22:39",
    "frequency": 16,
    "bonusProduct": {
      "code": "MARCA-45",
      "name": "Producto De La Granja (bonificación)",
      "unit": "UN",
      "qty": 3
    }
  },
  {
    "id": 239033,
    "company": "IVSA",
    "name": "DESCUENTO-CLIENTE PUNTUAL/MM/- 7% - 1776",
    "description": "DESCUENTO- CLIENTE PUNTUAL 7%",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "carlos.ugalde",
    "createdAt": "2025-12-18T17:50:46",
    "updatedAt": "2025-12-18T17:50:46",
    "value": 7
  },
  {
    "id": 239032,
    "company": "VEMASSA",
    "name": "BEBIDAS-NEG-B2C-EAL-DH-ABR26 - 1777048008201",
    "description": "MIX CASA CAMBA   FRUSSION LT  6 + 1 PENSION",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      10
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2023-04-30T20:27:11",
    "updatedAt": "2023-04-30T20:27:11",
    "frequency": 6,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239031,
    "company": "VEMASSA",
    "name": "BEBIDAS-NEG-B2C-EAL-DH-ABR26 - 1777047886464",
    "description": "BEBIDA DE LA GRANJA  6 + 1 BONIF  NAR",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      10
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "RESTRICTED",
    "specificRows": [
      {
        "id": "s239031",
        "type": "MARCA",
        "code": "MARCA-45",
        "name": "De La Granja"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2024-01-25T14:17:04",
    "updatedAt": "2024-01-25T14:17:04",
    "frequency": 6,
    "bonusProduct": {
      "code": "MARCA-45",
      "name": "Producto De La Granja (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239030,
    "company": "IVSA",
    "name": "DULCES - NEG - B2B - SCZ - INST - ABRIL. MAYO. JUN 2026 - MIL SHAKE MIX 8+1",
    "description": "DULCES - NEG - B2B - SCZ - INST - ABRIL. MAYO. JUN 2026 - MIL SHAKE MIX 8+1",
    "fromDate": "2026-04-24",
    "thruDate": "2026-07-06",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2026-04-24T11:51:23",
    "updatedAt": "2026-04-24T11:51:23",
    "frequency": 8,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239029,
    "company": "IVSA",
    "name": "SALSAS-NEG-B2C-SCZ-DH-ABRIL 26 - MIX SALSAS FORATO 9 G (3%) - 1777044908239",
    "description": "SALSAS DH SCZ - ABRIL  2025",
    "fromDate": "2026-04-24",
    "thruDate": "2026-05-03",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "fernando.unzueta",
    "createdAt": "2024-03-06T15:04:51",
    "updatedAt": "2024-03-06T15:04:51",
    "value": 3
  },
  {
    "id": 239028,
    "company": "IVSA",
    "name": "SALSAS-NEG-B2C-SCZ-DH-ABRIL 26 - MIX SALSAS CATEGORIA NEGOCIOS (3%)-(6%)",
    "description": "SALSAS DH SCZ - ABRIL  2026",
    "fromDate": "2026-04-24",
    "thruDate": "2026-05-03",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "cecilia.viera",
    "createdAt": "2024-03-06T15:04:51",
    "updatedAt": "2024-03-06T15:04:51",
    "value": 3
  },
  {
    "id": 239027,
    "company": "IVSA",
    "name": "LIMPIEZA - B2B - TJA - ABR 2026 - DET. EN POLVO PULPIN 150 GR - 6 + 1 16.67% (LICITACION) ELIANA REJ",
    "description": "LIMPIEZA - B2B - TJA - ABR 2026 - DET. EN POLVO PULPIN 150 GR - 6 + 1 16.67% (LICITACION) ELIANA REJAS PEREZ",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-28",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      4
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239027",
        "type": "MARCA",
        "code": "MARCA-23",
        "name": "Pulpin"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2023-06-01T05:29:45",
    "updatedAt": "2023-06-01T05:29:45",
    "frequency": 6,
    "bonusProduct": {
      "code": "MARCA-23",
      "name": "Producto Pulpin (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239026,
    "company": "VEMASSA",
    "name": "BEBIDAS-CLIENTE PUNTUAL-SCR-TODOS-ABR2026- AGUA SPERANZA DE 2 L  15 uni + 3 uni",
    "description": "BEBIDAS-CLIENTE PUNTUAL-SCR-TODOS-ABR2026- AGUA SPERANZA DE 2 L  15 uni + 3 uni",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239026",
        "type": "MARCA",
        "code": "MARCA-52",
        "name": "Speranza"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2024-06-01T10:46:22",
    "updatedAt": "2024-06-01T10:46:22",
    "frequency": 15,
    "bonusProduct": {
      "code": "MARCA-52",
      "name": "Producto Speranza (bonificación)",
      "unit": "UN",
      "qty": 3
    }
  },
  {
    "id": 239025,
    "company": "IVSA",
    "name": "LIMPIEZA VAJILLERO PULPIN 1050 ML (ACCIONES POR COMPENSACION) - 1777037826350",
    "description": "LIMPIEZA-B2C-LP-TRAD/PROV ABRIL 26 VAJILLERO DOYPACK PULPIN 1050 ML (50+10) - NO ACUMULABLE – 20%",
    "fromDate": "2026-04-17",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239025",
        "type": "MARCA",
        "code": "MARCA-23",
        "name": "Pulpin"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2023-05-04T13:27:34",
    "updatedAt": "2023-05-04T13:27:34",
    "frequency": 50,
    "bonusProduct": {
      "code": "MARCA-23",
      "name": "Producto Pulpin (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239024,
    "company": "IVSA",
    "name": "DESCUENTO-CLIENTE PUNTUAL/TRIOS SAN JUAN  3% - 1776197699824 - 1777035042459",
    "description": "DESCUENTO- CLIENTE PUNTUAL /TRIOS SAN JUAN",
    "fromDate": "2026-04-14",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "sergio.rosso",
    "createdAt": "2025-12-18T17:50:46",
    "updatedAt": "2025-12-18T17:50:46",
    "value": 3
  },
  {
    "id": 239023,
    "company": "IVSA",
    "name": "DESCUENTO-CLIENTE PUNTUAL/TRIOS SAN JUAN  3% - 1776197699824 - 1777035041091",
    "description": "DESCUENTO- CLIENTE PUNTUAL /TRIOS SAN JUAN",
    "fromDate": "2026-04-14",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "angel.franco",
    "createdAt": "2025-12-18T17:50:46",
    "updatedAt": "2025-12-18T17:50:46",
    "value": 3
  },
  {
    "id": 239022,
    "company": "IVSA",
    "name": "CANAL FORMAL LPZ - Desc. 4,60% REFACTURACIÓN HIPERMAXI - Abr 2026",
    "description": "FORMAL LPZ - Desc. 4,60% x Refacturacion HIPERMAXI ABR 2026",
    "fromDate": "2026-04-24",
    "thruDate": "2026-04-25",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      2
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [
      {
        "id": "c239022",
        "type": "CLIENTE",
        "code": "200001",
        "name": "Hipermaxi S.A."
      }
    ],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "fernando.unzueta",
    "createdAt": "2026-04-24T08:38:43",
    "updatedAt": "2026-04-24T08:38:43",
    "value": 4.6
  },
  {
    "id": 239021,
    "company": "IVSA",
    "name": "CANAL FORMAL MODERNO TRESBEDE -",
    "description": "DESCUENTO TRIOS",
    "fromDate": "2026-04-23",
    "thruDate": "2026-06-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [
      {
        "id": "c239021",
        "type": "CLIENTE",
        "code": "200003",
        "name": "Tresbede"
      }
    ],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "cecilia.viera",
    "createdAt": "2026-04-23T08:32:08",
    "updatedAt": "2026-04-23T08:32:08",
    "value": 5
  },
  {
    "id": 239020,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - DESCUENTO NUEVOS LANZAMIENTOS 4%",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - DESCUENTO NUEVOS LANZAMIENTOS 4%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "genaro.valverde",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "value": 4
  },
  {
    "id": 239019,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  KETC/MOST 3950 GRS MIX KRIS - 60 +10 UNIDAD -",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  KETC/MOST 3950 GRS MIX KRIS - 60 +10 UNIDAD -  INCID 16.6%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239019",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239018,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABRIL 2026 - FORMATO -  MAYONESA 3650 GRS MIX KRIS - 60 +10 UNIDAD -  - 1776978912303",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABRIL 2026 - FORMATO -  MAYONESA 3650 GRS MIX KRIS - 60 +10 UNIDAD -  INCIDENCIA 16.67%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239018",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239017,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABRIL 2026 - FORMATO - 2860 GRS MOSTAZA/KETCHUP KRIS - 60 + 10 UNIDAD - 1776978738661",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO - 2860 GRS MOSTAZA/KETCHUP KRIS - 60 + 10 UNIDAD -  INCID 16.67%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239017",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239016,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABRIL 2026 - FORMATO - 2860 GRS MAYONESA KRIS - 60 + 10 UNIDAD -  INC - 1776978661743",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO - 2860 GRS MAYONESA KRIS - 60 + 10 UNIDAD -  INCID 16.67%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239016",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239015,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MOSTAZA/KETCHUP KRIS 985 G - 60 + 10 UNIDAD -",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MOSTAZA/KETCHUP KRIS 985 G - 60 + 10 UNIDAD -  INCID 16.6%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239015",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239014,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MAYONESA KRIS 980 G - 60 + 10 UNIDAD -  INCID 1",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MAYONESA KRIS 980 G - 60 + 10 UNIDAD -  INCID 16.6%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239014",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239013,
    "company": "IVSA",
    "name": "CULINARIO- INST. SCZ.ABRIL-2026 BONIF.12+1 EXTRACTO DE TOMATE GALON 4KG",
    "description": "CULINARIO- INST. SCZ.ABRIL-2026 BONIF.12+1 EXTRACTO DE TOMATE GALON 4KG",
    "fromDate": "2026-04-23",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2026-04-23T16:51:48",
    "updatedAt": "2026-04-23T16:51:48",
    "frequency": 12,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239012,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABRIL 2026 - FORMATO -  KETCHUP/MOSTAZA 485 G - KRIS - 60 + 10 UNIDAD - 1776977413891",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABRIL 2026 - FORMATO -  KETCHUP/MOSTAZA 485 G - KRIS - 60 + 10 UNIDADES -  INCIDENCIA 16.6%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239012",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "carlos.ugalde",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239011,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MAYONESA 485 G - KRIS - 60 + 10 UNIDADES - No A",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MAYONESA 485 G - KRIS - 60 + 10 UNIDADES - No Acumulable - INCID 16.67%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239011",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 60,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 10
    }
  },
  {
    "id": 239010,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MAYONESA KRIS DOYPACK 225 g - 600 + 100 UNIDADE",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MAYONESA KRIS DOYPACK 225 g - 600 + 100 UNIDADES -  INCID 16,67%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239010",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 600,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 100
    }
  },
  {
    "id": 239009,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MOSTAZA/KETCHUP KRIS DOYPACK 200 g - 600 + 100",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO -  MOSTAZA/KETCHUP KRIS DOYPACK 200 g - 600 + 100 UNIDADES -  INCID 16,67%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239009",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "angel.franco",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 600,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 100
    }
  },
  {
    "id": 239008,
    "company": "VEMASSA",
    "name": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO - 47 GRS MIX - 200 + 33 UNIDADES -  INCID. 16,5%",
    "description": "SALSAS-CTE-B2C-CBB-TRAD/PROV - ABR 2026 - FORMATO - 47 GRS MIX - 200 + 33 UNIDADES -  INCID. 16,5%",
    "fromDate": "2026-04-01",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "fernando.unzueta",
    "createdAt": "2022-11-02T20:20:07",
    "updatedAt": "2022-11-02T20:20:07",
    "frequency": 200,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 33
    }
  },
  {
    "id": 239007,
    "company": "IVSA",
    "name": "LIMPIEZA OR VAJILLERO PULPIN PACK 26 04 TUPPER",
    "description": "LIMPIEZA - B2C -TODOS OR - ABR 26 -  VAJILLERO PULPIN 1050ML + TUPPER 4 UNI + 1 UNI",
    "fromDate": "2026-04-23",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239007",
        "type": "MARCA",
        "code": "MARCA-23",
        "name": "Pulpin"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "cecilia.viera",
    "createdAt": "2023-05-03T13:33:09",
    "updatedAt": "2023-05-03T13:33:09",
    "frequency": 4,
    "bonusProduct": {
      "code": "MARCA-23",
      "name": "Producto Pulpin (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239006,
    "company": "IVSA",
    "name": "LIMPIEZA OR VAJILLERO 5L - 26 04 ACC",
    "description": "LIMPIEZA - B2C -TODOS OR - ABR 26 -  VAJILLERO 5L + GUANTES LIMPIEZA  4 UNIDADES + 1 UNIDAD",
    "fromDate": "2026-04-23",
    "thruDate": "2026-04-30",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "genaro.valverde",
    "createdAt": "2023-05-03T13:19:20",
    "updatedAt": "2023-05-03T13:19:20",
    "frequency": 4,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239005,
    "company": "IVSA",
    "name": "CULINARIO-NEG-B2C-CBB-TRAD/PROV-ABRIL 2026 - CULINARIOS - ATUN - DESCUENTO 50% PRODUCCTO NO CONFORME",
    "description": "CULINARIO-NEG-B2C-CBB-TRAD/PROV-ABRIL 2026 - CULINARIOS - ATUN - DESCUENTO 50% PRODUCCTO NO CONFORME",
    "fromDate": "2026-04-23",
    "thruDate": "2026-04-30",
    "outcomeMode": "SINGLE",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      3
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "DISCOUNT_PERCENTAGE",
    "createdBy": "carlos.ugalde",
    "createdAt": "2026-04-23T16:18:32",
    "updatedAt": "2026-04-23T16:18:32",
    "value": 50
  },
  {
    "id": 239004,
    "company": "IVSA",
    "name": "ALIMENTOS-B2C-PND-TRAD.- ABRIL/26 (FRUTARITO 220Gr) 1 EST+ 1 EST_COMPRA INTERNA_ENVASE MAL ESTADO",
    "description": "ALIMENTOS-B2C-PND-TRAD.- ABRIL/26 (FRUTARITO 220Gr) 1 EST+ 1 EST_COMPRA INTERNA_ENVASE MAL ESTADO",
    "fromDate": "2026-04-23",
    "thruDate": "2026-05-31",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "APPROVED",
    "exclusiveOutcome": "NONE",
    "distributorIds": [],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "ernesto.montero",
    "createdAt": "2024-05-06T01:38:28",
    "updatedAt": "2024-05-06T01:38:28",
    "frequency": 1,
    "bonusProduct": {
      "code": "N/D",
      "name": "Producto de regalo",
      "unit": "UN",
      "qty": 1
    }
  },
  {
    "id": 239003,
    "company": "IVSA",
    "name": "ALIMENTOS - B2B - PANADERIA - SCZ - ABRIL 20226- FLAN KRIS DE 1 KILO 5+1 - 1776974272876",
    "description": "ALIMENTOS - B2B - PANADERIA - SCZ - ABRIL 20226- FLAN KRIS DE 1 KILO 5+1",
    "fromDate": "2026-04-05",
    "thruDate": "2026-05-02",
    "outcomeMode": "FREQUENCY",
    "applyOnlyOnce": false,
    "status": "DISABLED",
    "approvalStatus": "WAITING_COMMERCIAL_APPROVAL",
    "exclusiveOutcome": "NONE",
    "distributorIds": [
      1
    ],
    "warehouseIds": [],
    "paymentCondition": "TODOS",
    "criteriaRows": [],
    "ruleType": "GENERAL",
    "specificRows": [
      {
        "id": "s239003",
        "type": "MARCA",
        "code": "MARCA-04",
        "name": "Kris"
      }
    ],
    "target": "PRODUCT",
    "outcomeType": "PRODUCT",
    "createdBy": "sergio.rosso",
    "createdAt": "2025-11-02T19:16:41",
    "updatedAt": "2025-11-02T19:16:41",
    "frequency": 5,
    "bonusProduct": {
      "code": "MARCA-04",
      "name": "Producto Kris (bonificación)",
      "unit": "UN",
      "qty": 1
    }
  }
]
