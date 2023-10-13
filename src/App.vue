<template>
    <el-card style=" margin: 0 auto;">
        <div class="main">
            <div class="left">
                <el-input resize="none" style="width: 275px;" v-model="data" type="textarea" />
                <el-button class="btn" type="primary" @click="aaa">录入</el-button>
                <el-button class="btn2" @click="btnExcel" type="danger">导出Excel表格</el-button>
                <el-button class="btn2" type="primary" @click="deldata">清空表格</el-button>
            </div>
            <div class="right">
                <el-table size="small" :data="tableData" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="45px" />
                    <el-table-column prop="name" label="事业部" />
                    <el-table-column prop="name" label="区域" />
                    <el-table-column prop="宴席时间" label="宴席日期" />
                    <el-table-column prop="宴席具体时间" label="具体时间" />
                    <el-table-column prop="宴席性质" label="宴席性质" />
                    <el-table-column prop="用酒品种" label="用酒品种" />
                    <el-table-column prop="用酒件数" label="购酒数量" />
                    <el-table-column prop="赠酒瓶数" label="赠酒数量" />
                    <el-table-column prop="宴席地址" label="宴席地址" />
                    <el-table-column prop="购酒人" label="购酒人" />
                    <el-table-column prop="购酒人电话" label="联系电话" />
                    <el-table-column prop="宴席中间人" label="宴席中间人" />
                    <el-table-column prop="电话" label="联系电话" />
                    <el-table-column prop="name" label="宴席中间人奖励" />
                    <el-table-column prop="烟酒门市" label="终端门市" />
                    <el-table-column prop="业务员" label="业务员" />
                    <el-table-column prop="业务电话" label="电话" />
                    <el-table-column prop="提报日期" label="提报日期" />
                </el-table>
            </div>
        </div>

    </el-card>
</template>
  
<script  setup>
import { ref } from 'vue'
import { utils, writeFile } from 'xlsx';
import { ElMessage } from 'element-plus'
const data = ref()
const tableData = ref([])
const arr = ['提报日期', '区域', '宴席时间', '烟酒门市', '宴席中间人', '电话', '购酒人', '购酒人电话', '宴席地址', '宴席性质', '用酒品种', '用酒件数', '赠酒瓶数', '业务员', '业务电话', '宴席具体时间']
const aaa = () => {
    if (data.value === undefined) {
        ElMessage({
            message: '录入数据为空',
            type: 'warning',
        })
    } else {
        extractKeyValuePairs(data.value)
        data.value = ''
    }
}

const deldata = () => {
    tableData.value = ''
}

const extractKeyValuePairs = (text) => {
    for (let i = 0; i < arr.length; i++) {
        const reg = new RegExp(arr[i] + '：', 'ig')
        const tem = reg.test(text)
        if (!tem) {
            const reg = new RegExp(arr[i], 'ig')
            text = text.replace(reg, `${arr[i]}：`)
        }
    }
    // 定义正则表达式模式来匹配键值对
    const pattern = /([^：]+)：([^\n\r]+)/g;
    const keyValuePairs = {}; // 存储键值对的对象
    // 使用正则表达式进行匹配和提取
    let match;
    while ((match = pattern.exec(text)) !== null) {
        const key = match[1].trim();
        const value = match[2].trim();
        keyValuePairs[key] = value;
    }

    // return keyValuePairs;
    tableData.value.push(keyValuePairs)
}



const arr1 = ['序号', '事业部', '区域', '提报日期', '具体时间', '宴席性质', '用酒品种', '购酒数量', '赠酒数量', '宴席地址', '购酒人', '联系电话', '宴席中间人', '联系电话', '宴席中间人奖励', '终端门市', '业务员', '业务电话', '提报日期', '箱皮是否回收', '备注']

function exportExcel(data, filename) {
    let exc = utils.book_new();
    let exc_data = utils.aoa_to_sheet(data);
    utils.book_append_sheet(exc, exc_data, filename);
    writeFile(exc, filename + '.xlsx');
}

let list = []
const btnExcel = () => {
    if (tableData.value.length === 0) {
        ElMessage({
            message: '导出的数据不能为空',
            type: 'warning',
        })
    } else {
        list.push(arr1)
        tableData.value.forEach((item, index) => {
            list.push([index + 1, '高端事业部', '馆陶十年二十年办', item['宴席时间'], item['宴席具体时间'], item['宴席性质'], item['用酒品种'], item['用酒件数'], item['赠酒瓶数'], item['宴席地址'], item['购酒人'], item['购酒人电话'], item['宴席中间人'], item['电话'], '', item['烟酒门市'], item['业务员'], item['业务电话'], item['提报日期'],])
        })
        exportExcel(list, '宴席提报')
    }
}







</script>
<style scoped>
:deep(.el-textarea__inner) {
    background-color: #F7FAFC;
    height: 400px;
}

.main {
    display: flex;
}

.left {
    width: 280px;
}

.btn {
    margin-top: 10px;
    width: 278px;
}

:deep(.el-button) {
    margin-left: 0 !important;
}

.btn2 {
    /* margin-left: -20px; */
    width: 278px;
    margin-top: 10px;
}
</style>
  