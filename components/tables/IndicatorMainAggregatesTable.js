// La Société Nouvelle

// Utils
import { printValue } from '/src/utils/Utils';

// Libraries
import metaIndics from '/lib/indics';
import { buildIndicatorAggregate } from '../../src/formulas/footprintFormulas';

/* ---------- INDICATOR STATEMENT TABLE ---------- */

export const IndicatorMainAggregatesTable = ({indic,session}) =>
{
  const financialData = session.financialData;

  const nbDecimals = metaIndics[indic].nbDecimals;
  const unit = metaIndics[indic].unit;
  const unitGrossImpact = metaIndics[indic].unitAbsolute;
  const printGrossImpact = ["ghg","haz","mat","nrg","was","wat"].includes(indic);

  const expensesAggregates = getBasicExternalExpensesGroups(indic,financialData);
  const depreciationExpensesAggregates = getBasicDepreciationExpensesGroups(indic,financialData);

  const {production,
         revenue,
         storedProduction,
         immobilisedProduction,
         intermediateConsumption,
         storedPurchases,
         capitalConsumption,
         netValueAdded} = financialData.aggregates;

  return (
    <table>
      <thead>
        <tr>
          <td colSpan="3">Agrégat</td>
          <td className="column_value" colSpan="2">Valeur</td>
          <td className="column_uncertainty">Incertitude</td>
          {printGrossImpact ? <td className="column_value" colSpan="2">Impact</td> : null}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Production</td>
          <td className="column_value">{printValue(production.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(production.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(production.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(production.footprint.indicators[indic].getGrossImpact(production.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>
        <tr>
          <td>&emsp;Production vendue</td>
          <td className="column_value">{printValue(revenue.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(revenue.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(revenue.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(revenue.footprint.indicators[indic].getGrossImpact(revenue.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>
      {storedProduction != 0 &&
        <tr>
          <td>&emsp;Production stockée</td>
          <td className="column_value">{printValue(storedProduction.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(storedProduction.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(storedProduction.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(storedProduction.footprint.indicators[indic].getGrossImpact(storedProduction.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>}
      {immobilisedProduction.amount > 0 &&
        <tr>
          <td>&emsp;Production immobilisée</td>
          <td className="column_value">({printValue(immobilisedProduction.amount,0)})</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(immobilisedProduction.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(immobilisedProduction.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">({printValue(immobilisedProduction.footprint.indicators[indic].getGrossImpact(immobilisedProduction.amount),nbDecimals)})</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>
        }
        <tr className="with-top-line">
          <td>Consommations intermédiaires</td>
          <td className="column_value">{printValue(intermediateConsumption.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(intermediateConsumption.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(intermediateConsumption.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(intermediateConsumption.footprint.indicators[indic].getGrossImpact(intermediateConsumption.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>
      {storedPurchases != 0 &&
        <tr>
          <td>&emsp;Variation de stocks</td>
          <td className="column_value">{printValue(-storedPurchases.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(storedPurchases.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(storedPurchases.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(storedPurchases.footprint.indicators[indic].getGrossImpact(-storedPurchases.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>}

      {expensesAggregates.filter(aggregate => aggregate.amount != 0)
                         .map(({accountLib,amount,footprint},index) => 
        <tr key={index}>
          <td>&emsp;{accountLib}</td>
          <td className="column_value">{printValue(amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(footprint.indicators[indic].getGrossImpact(amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>)}

        <tr className="with-top-line">
          <td>Consommations de capital fixe</td>
          <td className="column_value">{printValue(capitalConsumption.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(capitalConsumption.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(capitalConsumption.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(capitalConsumption.footprint.indicators[indic].getGrossImpact(capitalConsumption.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>
      {depreciationExpensesAggregates.filter(aggregate => aggregate.amount != 0)
                                     .map(({accountLib,amount,footprint},index) => 
        <tr key={index}>
          <td>&emsp;{accountLib}</td>
          <td className="column_value">{printValue(amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(footprint.indicators[indic].getGrossImpact(amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>)}
        
        <tr className="with-top-line">
          <td>Valeur ajoutée nette</td>
          <td className="column_value">{printValue(netValueAdded.amount,0)}</td>
          <td className="column_unit">&nbsp;€</td>
          <td className="column_value">{printValue(netValueAdded.footprint.indicators[indic].getValue(),nbDecimals)}</td>
          <td className="column_unit">&nbsp;{unit}</td>
          <td className="column_uncertainty"><u>+</u>&nbsp;{printValue(netValueAdded.footprint.indicators[indic].getUncertainty(),0)}&nbsp;%</td>
          {printGrossImpact ? <td className="column_value">{printValue(netValueAdded.footprint.indicators[indic].getGrossImpact(netValueAdded.amount),nbDecimals)}</td> : null}
          {printGrossImpact ? <td className="column_unit">&nbsp;{unitGrossImpact}</td> : null}
        </tr>
      </tbody>
    </table>
  )
}

/* ----- GROUP FUNCTIONS ----- */

// External expenses
const getBasicExternalExpensesGroups = (indic,financialData) =>
{
  let expensesGroups = financialData.getExternalExpensesAggregates();
  return expensesGroups;
}

// Depreciation expenses
const getBasicDepreciationExpensesGroups = (indic,financialData) =>
{
  let expensesGroups = financialData.getBasicDepreciationExpensesAggregates();
  return expensesGroups;
}