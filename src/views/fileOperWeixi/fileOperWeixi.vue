<!-- 档案管理/包括微信绑定 -->
<template>
  <transition name="fileOperWeixi">
    <div class="fileOperWeixi">
      档案管理/包括微信绑定
      <query-reset @clickQueryBtn="clickQueryBtn">
        <template v-slot:show_part>
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="活动时间">

                    <el-col :span="11">
                      <el-date-picker
                        v-model="form.date2"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
                      </el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </template>
        <template v-slot:hide_part>
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="活动时间">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                    <el-col :span="11">
                      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="活动区域">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="活动时间">
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                    <el-col :span="11">
                      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </template>
      </query-reset>

      <div>
        <div class="block">
          <label for="abc">
            <label for="abc">
              <span class="demonstration">多选选择任意一级选项</span>
              <el-select
                id="abc"
                v-model="value2"
                multiple
                style="margin-left: 20px;opacity:0;"
                placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :disabled="item.disabled"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </label>
          </label>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import QueryReset from '@/components/queryReset/queryReset'

  export default {
    name:'fileOperWeixi',
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
        },
        options:[
          {
            value: '1',
            label: '一致',
            disabled:true
          },
          {
            value: '2',
            label: '反馈',
            disabled:true
          },
          {
            value: '3',
            label: '效率'
          },
          {
            value: '4',
            label: '可控'
          },
          {
            value: '5',
            label: '一致'
          },
          {
            value: '6',
            label: '反馈'
          },
          {
            value: '7',
            label: '效率'
          },
          {
            value: '8',
            label: '可控'
          },
          {
            value: '9',
            label: '一致'
          },
          {
            value: '10',
            label: '反馈'
          },
          {
            value: '11',
            label: '效率'
          },
          {
            value: '12',
            label: '可控'
          }
        ],
        value2:['1','2']
      }
    },
    computed:{
    },
    components:{
      QueryReset
    },
    mounted(){

    },
    methods:{  
      clickQueryBtn(n){
        console.log(n);
      },
      cascader(a,b,c){
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  }
</script>
<style lang='scss' rel='stylesheet/scss'>
.fileOperWeixi{
  width:100%;
  height:100%;

  .el-select__tags{
    display:none;
  }
}

</style>