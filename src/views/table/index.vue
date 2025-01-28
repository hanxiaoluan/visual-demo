<template>
  <div class="cell-demo">
    <a-form layout="inline" :model="form">
      <a-form-item label="Border" field="border">
        <!-- <a-switch v-model="form.border" /> -->
      </a-form-item>
      <a-form-item label="Hover" field="hover">
        <a-switch v-model="form.hover" />
      </a-form-item>
      <a-form-item label="stripe" field="stripe">
        <a-switch v-model="form.stripe" />
      </a-form-item>
      <a-form-item label="checkbox" field="checkbox">
        <a-switch v-model="form.checkbox" />
      </a-form-item>
      <a-form-item label="checkAll" field="checkAll">
        <a-switch v-model="rowSelection.showCheckedAll" />
      </a-form-item>
      <a-form-item label="loading" field="loading">
        <a-switch v-model="form.loading" />
      </a-form-item>
      <a-form-item label="tableHeader" field="tableHeader">
        <a-switch v-model="form.tableHeader" />
      </a-form-item>
      <a-form-item label="noData" field="noData">
        <a-switch v-model="form.noData" />
      </a-form-item>
    </a-form>
    <LTable
      :columns="columns"
      :data="form.noData ? [] : data"
      :bordered="form.border"
      :hoverable="form.hover"
      :stripe="form.stripe"
      :loading="form.loading"
      :show-header="form.tableHeader"
      @rowDblclick="onRowDblclick"
      :row-selection="form.checkbox ? rowSelection : undefined"
    />
  </div>
  
</template>

<script>
import { reactive } from 'vue';
import LTable from '@/components/table';
export default {
  components: { LTable },
  setup() {
    const form = reactive({
      border: {
        wrapper: false,
        cell: false,
        headerCell: false,
        bodyCell: true
      },
      borderCell: false,
      hover: true,
      stripe: false,
      checkbox: true,
      loading: false,
      tableHeader: true,
      noData: false
    });

    const rowSelection = reactive({
      type: 'checkbox',
      showCheckedAll: true
    });

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ];

    const data = [{
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }];

    return {
      form,
      rowSelection,
      columns,
      data,
      onRowClick: (row, ev) => console.log(row, ev),
      onRowDblclick: (row, ev) => console.log(row, ev),
    }
  },
}
</script>

<style lang="less">
.cell-demo {
  margin-top: 24px;
  padding: 48px;
  border: 1px solid #cecece;
  border-radius: 2px 2px 0 0;
}
</style>