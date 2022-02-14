<template>
  <div class="view-reports">
    <ActionsRow class="view-reports__filters">
      <template #left>
        <h3>Reports</h3>
      </template>

      <template #right>
        <Select
          v-model:value="filterState.projectId"
          :options="filterState.projectOptions"
          placeholder="All projects"
          :bordered="false"
        />

        <Select
          v-model:value="filterState.gatewayId"
          :options="filterState.gatewayOptions"
          placeholder="All gateways"
          :bordered="false"
        />

        <DatePicker
          v-model:value="filterState.from"
          placeholder="From date"
          :bordered="false"
          :disabled="true"
        />

        <DatePicker
          v-model:value="filterState.to"
          placeholder="To date"
          :bordered="false"
          :disabled="true"
        />

        <Button type="primary" @click="onClickGenerateReport">Generate Report</Button>
      </template>
    </ActionsRow>

    <div v-if="!state.isLoading && !state.reports.length" class="view-reports__empty" >
      <h2 class="empty__headline">No Reports</h2>

      <p class="empty__paragraph">
        Currently you have no data for the reports to be generated.
        Once you start generating traffic through the Balance application
        the reports will be shown.
      </p>

      <img class="empty__image" src="/images/empty.svg" alt="empty"/>
    </div>

    <div v-if="!state.isLoading && state.reports.length" class="view-reports__reports">
      <h4>{{ getActiveProject() }} | {{ getActiveGateway() }}</h4>

      <Table class="reports__table" :columns="columns" :data-source="state.reports">
        <template #summary>
          <TableSummaryRow>
            <TableSummaryCell>
              <h2 class="table__summary">TOTAL | {{getTotalAmount()}} USD</h2>
            </TableSummaryCell>
          </TableSummaryRow>
        </template>
      </Table>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from "vue";
  import { getData, postData } from "../service";

  import { Button, Select, DatePicker, Table, TableSummaryRow, TableSummaryCell } from "ant-design-vue";
  import ActionsRow from "../components/layout/ActionsRow.vue";

  const filterState = reactive({
    projectId: null,
    projectOptions: [{ label: "All projects", value: null }],
    gatewayId: null,
    gatewayOptions: [{ label: "All gateways", value: null }],
    from: null,
    to: null,
  });

  const state = reactive({
    isLoading: false,
    reports: [],
  })

  const columns = [
    {
      title: "Date",
      key: "created",
      dataIndex: "created"
    },
    {
      title: "Gateway",
      key: "gatewayId",
      dataIndex: "gatewayId",
    },
    {
      title: "Transaction ID",
      key: "paymentId",
      dataIndex: "paymentId"
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount"
    }
  ]

  onMounted(async () => {
    const projects = await getData("/projects")
      .then((data) => data.map(({ name: label, projectId: value }) => ({ label, value })));
    filterState.projectOptions = [...filterState.projectOptions, ...projects];

    const gateways = await getData("/gateways")
      .then((data) => data.map(({ name: label, gatewayId: value }) => ({ label, value })));
    filterState.gatewayOptions = [...filterState.gatewayOptions, ...gateways]
  })

  function getActiveProject() {
    const { label } = filterState.projectOptions?.find(({ value }) => value === filterState.projectId);
    return label;
  }

  function getActiveGateway() {
    const { label } = filterState.gatewayOptions?.find(({ value }) => value === filterState.gatewayId);
    return label;
  }

  function getTotalAmount() {
    const totalAmount = state.reports.reduce((totalReports, currentReport) => {
      return totalReports + currentReport.amount;
    }, 0)

    return totalAmount.toFixed(2);
  }

  async function onClickGenerateReport() {
    const { from, to, projectId, gatewayId } = filterState;
    const reports = await postData("/report", { from, to, projectId, gatewayId });
    return (state.reports = reports);
  }

  defineExpose({ state, filterState, getActiveProject, getTotalAmount, getActiveGateway, onClickGenerateReport });
</script>

<style lang="scss">
  .view-reports {
    &__filters {
      padding: 33px 0;
    }

    &__empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      max-width: 470px;
      margin: 96px auto;

      .empty__headline {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        text-align: center;
        color: #011F4B;
      }

      .empty__paragraph {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        color: #7E8299;
      }

      .empty__image {
        margin-top: 48px;
      }
    }

    &__reports {
      background-color: #F1FAFE;
      border-radius: 10px;
      padding: 18px 24px;

      .table__summary {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        color: #011F4B;
      }
    }

    // TODO: Move to own components with own styles
    .ant-select {
      background-color: #1BC5BD !important;
      border-radius: 5px;

      input::placeholder {
        color: white !important;
      }
    }

    // TODO: Move to own components with own styles
    .ant-btn.ant-btn-primary {
      background-color: #005B96;
      border-radius: 5px;
      color: white;
    }

    // TODO: Move to own components with own styles
    .ant-picker {
      background-color: #1BC5BD !important;
      border-radius: 5px;

      input::placeholder,
      .anticon {
        color: white !important;
      }
    }
  }
</style>
