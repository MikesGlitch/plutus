<template>
  <div class="home">
    <p>Maybe just add it to mikesglitch.com?</p>
    <p>IndexedDb - potentially?</p>
    <p>PWA - potentially?</p>
    <p>Consider again using google sheets as the database.  It might give the user some utility and if i'm not doing the budget side it wont matter about the database because performance wont be an issue</p>
    <a href="https://beyondrule4.jmmorrissey.com/home">https://beyondrule4.jmmorrissey.com/home</a>
    <a href="https://api.youneedabudget.com/#works-with-ynab">Maybe interate with YNAB?</a>

    <section v-if="retirementPlan" class="main-case">
      <div class="main-case__years-container">
          <table>
            <tr>
              <th>age</th>
              <th>yearCount</th>
              <th>annualContributions</th>
              <th>startOfYearAmount</th>
              <th>investmentReturn</th>
              <th>endOfYearAmount</th>
              <th>totalContribution</th>
              <th>minRiskAllocationPercent</th>
              <th>equityRiskAllocationPercent</th>
              <th>minRiskAllocationAmount</th>
              <th>equityRiskAllocationAmount</th>
              <th>minRiskReturn</th>
              <th>equityRiskReturn</th>
            </tr>
            <tr class="year" v-for="retirementPlanYear in retirementPlan.years" :key="retirementPlanYear.yearCount">
              <td>{{retirementPlanYear.age}}</td>
              <td>{{retirementPlanYear.yearCount}}</td>
              <td>{{retirementPlanYear.annualContributions}}</td>
              <td>{{retirementPlanYear.startOfYearAmount}}</td>
              <td>{{retirementPlanYear.investmentReturn}}</td>
              <td>{{retirementPlanYear.endOfYearAmount}}</td>
              <td>{{retirementPlanYear.totalContribution}}</td>
              <td>{{retirementPlanYear.minRiskAllocationPercent}}</td>
              <td>{{retirementPlanYear.equityRiskAllocationPercent}}</td>
              <td>{{retirementPlanYear.minRiskAllocationAmount}}</td>
              <td>{{retirementPlanYear.equityRiskAllocationAmount}}</td>
              <td>{{retirementPlanYear.minRiskReturn}}</td>
              <td>{{retirementPlanYear.equityRiskReturn}}</td>
            </tr>
          </table>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
  }
})
export default class Home extends Vue {
  retirementPlan: unknown = null;

  mounted (): void {
    fetch('http://localhost:7071/api/Function1').then(async (res) => {
      this.retirementPlan = await res.json()
    })
  }
}
</script>

<style scoped lang="scss">
.main-case {
  &__years-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
