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
        <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
          导出 Excel
        </el-button>
      </div>
      <right-panel>
        1243
      </right-panel>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import RightPanel from '@/components/RightPanel'
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
        downloadLoading:false,
        filename:'aabbcc',

      }
    },
    computed:{
    },
    components:{
      RightPanel,
      QueryReset
    },
    mounted(){

    },
    methods:{  
      clickQueryBtn(n){
        console.log(n);
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
         const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
          const data = [[1,"Rkvlehrkt","Timothy",2142,"2001-01-13 22:42:06"]]
          // data  [[1,"Rkvlehrkt","Timothy",2142,"2001-01-13 22:42:06"]]
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: true,
            bookType: 'xlsx'
          })
          this.downloadLoading = false
        })
      },
    }
  }
</script>
<style scoped lang='scss' rel='stylesheet/scss'>
.fileOperWeixi{
  width:100%;
  height:100%;
}

</style>