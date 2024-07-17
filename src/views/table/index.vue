<template>
  <div class="cell-demo">
    <a-table :columns="columns" :data="data" :bordered="{cell: true}" :table-layout-fixed="false"/>
  </div>
  <div class="cell-demo">
    <Table :columns="columns" :data="data" />
  </div>
</template>

<script>
import { reactive } from 'vue';
import Table from '@/components/table/table'
export default {
  components: { Table },
  setup() {
    const columns = reactive([
      {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
        minWidth: 100,
      },
      {
        title: 'Salary',
        dataIndex: 'salary',
        width: 120,
        minWidth: 80,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: 300,
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
    ]);
    const data = reactive([{
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
    }]);

    return {
      columns,
      data
    }
  },
}
</script>

<style lang="less">
.cell-demo {
    margin-top: 24px;
    padding: 48px;
    border: 1px solid var(--color-border);
    border-radius: 2px 2px 0 0;
}
</style>