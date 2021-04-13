const API = {
    UserLogin:'/api/services/app/FireDeptUser/UserLogin',// 用户登录
    GetVerifyCode:'/api/services/app/FireDeptUser/GetVerifyCode',//获取验证码
    UserLogout:'/api/services/app/FireDeptUser/UserLogout',//注销用户



    //

    GetFireUnitListForReport:'/api/services/app/FDBigScreen/GetFireUnitListForReport',//
    GetFireUnitTypePieChat:'/api/services/app/FDBigScreen/GetFireUnitTypePieChat',
    GetFireAlarmForReport:'/api/services/app/FDBigScreen/GetFireAlarmForReport',//
    GetElecAlarmForReport:'/api/services/app/FDBigScreen/GetElecAlarmForReport',//
    GetFireFaultForReport:'/api/services/app/FDBigScreen/GetFireFaultForReport',//
    
    GetFireUnitLatByArea:'/api/services/app/FDBigScreen/GetFireUnitLatByArea',//获取区域内防火单位列表（经纬度）
    GetFireUnitLngLatByArea:'/api/services/app/FDBigScreen/GetFireUnitLngLatByArea',//
    
    GetFireUnitNumber:'/api/services/app/FDBigScreen/GetFireUnitNumber',//获得辖区内接入防火单位的数量
    GetNetDeviceNumber:'/api/services/app/FDBigScreen/GetNetDeviceNumber',//获得辖区内接入物联网设备的数量
    GetIoTAlarmNumber:'/api/services/app/FDBigScreen/GetIoTAlarmNumber',//获得指定时间段内物联指标异常数量
    GetIoTList:'/api/services/app/FDBigScreen/GetIoTList',//获取物联指标异常的防火单位列表
    GetIoTDiagram:'/api/services/app/FDBigScreen/GetIoTDiagram',//获取物联指标异常趋势
    GetFireUnitBaseInfo:'/api/services/app/FDBigScreen/GetFireUnitBaseInfo',// 获得防火单位需要在地图气泡窗口显示的基础信息
    GetFireUnitCard:'/api/services/app/FireUnit/GetFireUnitCard',//获取防火单位熟悉卡详情
    UpdateFireUnitCard:'/api/services/app/FireUnit/UpdateFireUnitCard',//修改防火单位熟悉卡	
    GetElectricAlarmList:'/api/services/app/FDBigScreen/GetElectricAlarmList',//获取安全用电指标异常数据列表
    GetFireDetectorFaultList:'/api/services/app/FDBigScreen/GetFireDetectorFaultList',//
    GetIndependentFaultList:'/api/services/app/FDBigScreen/GetIndependentFaultList',//获取独立烟感故障异常数据列表
    GetVisionAlarmist:'/api/services/app/FDBigScreen/GetVisionAlarmist',//获取消防通道堵塞异常数据列表
    GetWaterAlarmist:'/api/services/app/FDBigScreen/GetWaterAlarmist',//
    GetFireAlarmist:'/api/services/app/FDBigScreen/GetFireAlarmist',
    GetDetectorBitMap:'/api/services/app/FireDevice/GetDetectorBitMap',//
    //模糊查询
    QueryFireUnitLikeName:'/api/services/app/FireUnit/QueryFireUnitLikeName',// 查询防火单位名称(模糊查询)

    ExistNewTrueFireAlarm:'/api/services/app/FDBigScreen/ExistNewTrueFireAlarm',//判断是否有新的真实火警
    GetNearbyHygrant:'/api/services/app/FDBigScreen/GetNearbyHygrant',//

    GetHydrantNumber:'/api/services/app/FDBigScreen/GetHydrantNumber',//获得辖区内接入市政消火栓的数量
    GetPressureMonitorNumber:'/api/services/app/FDBigScreen/GetPressureMonitorNumber',//获得辖区内接入管网水压监测点的数量
    GetHydrantStateNumber:'/api/services/app/FDBigScreen/GetHydrantStateNumber',//获得市政消火栓状态实时数量
    GetHydrantList:'/api/services/app/FDBigScreen/GetHydrantList',//获得市政消火栓实时列表数据
    GetAllHydrantList:'/api/services/app/FDBigScreen/GetAllHydrantList',//获取全部消火栓
    GetHydrantStateDiagram:'/api/services/app/FDBigScreen/GetHydrantStateDiagram',//获取市政消火栓状态趋势


    GetAreas:'/api/services/app/Area/GetAreas',// 根据区域Id获取下级区域
    GetEngineerElectricDeviceState:'/api/services/app/FireDevice/GetEngineerElectricDeviceState',// 根据区域Id获取安全用电各状态设备数量
    GetMonthElectricAlarmData:'/api/services/app/Alarm/GetMonthElectricAlarmData',// 获取安全用电警情月度走势数据
    GetElectricHistogramData:'/api/services/app/FireDevice/GetElectricHistogramData',//获取各区域安全用电终端数量统计
    GetFireUnitInfo: "/api/services/app/FireUnit/GetFireUnitInfo", //防火单位信息
    GetFireUnitReport:'/api/services/app/FireUnit/GetFireUnitReport',//获取防火单位的综合数据报告
    //隐患及警情
    GetDeptFireAlarmList:'/api/services/app/Alarm/GetDeptFireAlarmList',// 监管平台：获取火警联网数据列表
    GetDeptFireAlarmListExcel:'/api/services/app/Alarm/GetDeptFireAlarmListExcel',//监管平台：导出火警联网数据
    GetDetectorBitMap:'/api/services/app/FireDevice/GetDetectorBitMap',//获取某条火警对应的部件的点位图数据

    //-独立火警
    GetDeptIndependentAlarmList:'/api/services/app/Alarm/GetDeptIndependentAlarmList' ,//监管平台：获取独立火警数据列表
    GetDeptIndependentAlarmListExcel:'/api/services/app/Alarm/GetDeptIndependentAlarmListExcel', //监管平台：导出独立火警数据


    //-安全用电
    GetDeptElectricAlarmList:'/api/services/app/Alarm/GetDeptElectricAlarmList',// 监管平台：获取安全用电数据列表
    GetDeptElectricAlarmListExcel:'/api/services/app/Alarm/GetDeptElectricAlarmListExcel' ,//监管平台：导出安全用电数据

    //-消防管网
    GetDeptWaterAlarmList:'/api/services/app/Alarm/GetDeptWaterAlarmList',//监管平台：获取消防管网警情数据列表
    GetDeptWaterAlarmListExcel:'/api/services/app/Alarm/GetDeptWaterAlarmListExcel',//监管平台：导出消防管网警情数据

    //--------消防设施---------
    GetDeptFireAlarmDeviceStateNum:'/api/services/app/FireDevice/GetDeptFireAlarmDeviceStateNum',// 监管平台：获取火警联网设施状态数量
    GetDeptFireAlarmDeviceList:'/api/services/app/FireDevice/GetDeptFireAlarmDeviceList',// 监管平台：获取火警联网设施列表
    GetFireAlarmFaultDetectorList:'/api/services/app/FireDevice/GetFireAlarmFaultDetectorList',//获取指定设备ID的故障部件列表
    GetFireAlarm30DayList:'/api/services/app/FireDevice/GetFireAlarm30DayList',//获取火警联网设施最近30天的火警列表数据
    GetFireAlarmHighList:'/api/services/app/FireDevice/GetFireAlarmHighList',//获取指定火警联网设施ID的高频报警部件列表



    //-独立火警
    GetDeptIndependentDeviceStateNum:'/api/services/app/IndependentDetector/GetDeptIndependentDeviceStateNum', //监管平台：获取独立火警设施状态数量
    GetDeptIndependentDetectorList:'/api/services/app/IndependentDetector/GetDeptIndependentDetectorList', //监管平台：获取独立火警设备数据列表
    //-安全用电
    GetDeptElectricDeviceStateNum:'/api/services/app/FireDevice/GetDeptElectricDeviceStateNum',// 监管平台：获取安全用电设施状态数量
    GetDeptElectricDeviceList:'/api/services/app/FireDevice/GetDeptElectricDeviceList',//监管平台：获取安全用电设施列表
    GetSingleElectricDeviceData:'/api/services/app/FireDevice/GetSingleElectricDeviceData',//刷新某一电气火灾设备的当前数值
    BreakoffPower:'/api/services/app/FireDevice/BreakoffPower',//发送断电信号
    DeleteFireElectricDevice:'/api/services/app/FireDevice/DeleteFireElectricDevice',//删除电气火灾设备
    GetRecordElectric:'/api/services/app/FireDevice/GetRecordElectric',//获取电气火灾监测单个项目的模拟量趋势

    GetFireElectricDevicePara:'/api/services/app/FireDevice/GetFireElectricDevicePara',//根据Id获取电气火灾设施参数详情
    UpdateFireElectricDevicePara:'/api/services/app/FireDevice/UpdateFireElectricDevicePara',//修改电气火灾设施参数


    //-消防管网
    GetDeptWaterDeviceStateNum:'/api/services/app/FireDevice/GetDeptWaterDeviceStateNum' ,//监管平台：获取消防管网设施状态数量
    GetDeptWaterDeviceList:'/api/services/app/FireDevice/GetDeptWaterDeviceList', //监管平台：获取消防管网设施列表
    //------------防火单位----------
    GetDeptFireUnitList:'/api/services/app/FireUnit/GetDeptFireUnitList',// 监管平台：获取防火单位列表

    //-------------市政消火栓--------------
    GetDeptHydrantList:'/api/services/app/Hydrant/GetDeptHydrantList', //监管平台：获取市政消火栓列表
    GetDeptPressureList:'/api/services/app/Hydrant/GetDeptPressureList', //监管平台：获取市政消防管网列表
    GetDeptHydrantAlarmList:'/api/services/app/Hydrant/GetDeptHydrantAlarmList', //监管平台：获取市政消火栓警情列表



    //-------------联盟区块--------------
    GetAreasByName:'/api/services/app/Area/GetAreasByName',// 根据名称模糊查询匹配的区域
    
    //组织
    AddOrganize:'/api/services/app/Block/AddOrganize',// 添加组织
    GetOrganizeList:'/api/services/app/Block/GetOrganizeList',// 获取组织列表
    UpdateOrganize:'/api/services/app/Block/UpdateOrganize',// 修改组织信息
    DeleteOrganize:'/api/services/app/Block/DeleteOrganize',// 删除组织信息
    AddOrganizeDevice:'/api/services/app/Block/AddOrganizeDevice',// 添加数据站
    GetOrganizeDeviceList:'/api/services/app/Block/GetOrganizeDeviceList',// 获取数据站列表
    UpdateOrganizeDevice:'/api/services/app/Block/UpdateOrganizeDevice',// 修改数据站信息
    DeleteOrganizeDevice:'/api/services/app/Block/DeleteOrganizeDevice',// 删除数据站
    //安全日志
    
    GetOrganizeForDropdown:'/api/services/app/Block/GetOrganizeForDropdown',// 在组织中输入中文，会自动模糊查询并弹出下拉选择框
    GetBlockDeviceLogList:'/api/services/app/Block/GetBlockDeviceLogList',// 获取安全日志列表
    

    //数据查看
    GetOrganizeVerifyResult:'/api/services/app/Block/GetOrganizeVerifyResult',// 数据站区块验证
    GetBlockDataList:'/api/services/app/Block/GetBlockDataList',// 区块链数据查询列表
}   

export default API;