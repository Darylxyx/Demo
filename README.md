# Demo

Some application deployed on gitpage.
# API

## 参数说明

---

#####测试环境

	api url前缀        http://10.1.4.3:8090/user/	
	
#####http方式

    POST
	
#####sessionId参数

	sessionId // 除了登录接口外,其余接口都需要该POST参数标识已登录用户，20分钟内无操作过期

#####返回数据格式

```json
{
	code:  // "success" 或 "fail"
	message: // 响应消息的i18n key
	result: // 响应数据, 后面接口只对这一部分数据作说明。
}
```

## api列表

---

### 登录
/console/login

#####说明
	
	1､ 超级管理员只有一个，登录名/密码：admin/rm123456
	2､ 只有超级管理员，才能添加、删除普通管理员	
	
#####请求参数

	loginName // 管理员登录名
	password  // 管理员密码
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "sessionId": "f783d676-6fd2-4931-be6a-ad15867a0519"
}
```
#####出错示例
```json
{
  "code": "fail",
  "message": "loginName.invalid"
}
```

### 修改密码
/console/changePassword

#####说明
	
	1､该接口只是修改当前登录管理员的密码
	
#####请求参数

	oldPassword // 原密码
	newPassword // 新密码

#####返回结果

```json
{
  "code": "success",
  "message": "success"
}
```

#####出错示例
```json
{
  "code": "fail",
  "message": "oldPassword.invalid"
}
```

	
### 用户注册
/console/logout

#####说明

	1､需要sessionId

#####请求参数
	
	无
	
#####返回结果

```json
{
  "code": "success",
  "message": "success"
}
```

#####出错示例
```json
{
  "code": "fail",
  "message": "sessionId.invalid"
}
```

	
### 添加管理员
/console/addUser

#####说明

	1､ 只有超级管理员才能访问
	2､ 登录名不能重复，真实姓名可以重复

#####请求参数
	
	loginName // 登录名
	password // 登录密码
	realName // 真实姓名
	
#####返回结果

```json
{
  "code": "success",
  "message": "success"
}
```

#####出错示例
```json
{
  "code": "fail",
  "message": "loginName.duplicate"
}
```
	
### 删除管理员
/console/deleteUser

#####说明

	1､ 只有超级管理员才能访问

#####请求参数
	
	loginName // 要删除的管理员的登录名
	
#####返回结果

```json
{
  "code": "success",
  "message": "success"
}
```

#####出错示例
```json
{
  "code": "fail",
  "message": "loginName.invalid"
}
```

### 管理员列表
/console/listUser

#####说明

	1､只有超级管理员才能访问
	2､按管理员登录名正序排序
	
#####请求参数
	
	无
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": [
    {
      "loginName": "abc1",
      "password": "def",
      "realName": "ggg"
    },
    {
      "loginName": "abc2",
      "password": "def",
      "realName": "ggg"
    }
  ]
}
```

#####出错示例
```json
{
  "code": "fail",
  "message": "sessionId.invalid"
}
```

	
### 添加员工人脸照片
/face/add

#####说明

	1、添加照片的同时，会添加员工
	2、同一张照片不能重复添加
	
#####请求参数
	
	person // 员工名
	img // 照片文件，三选一，multipart/form-data 的 POST 方式
	img_base64 // 照片内容base64字符串，三选一，x-www-form-urlencoded 的 POST 方式
	img_url // 照片url，三选一
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": {
    "faceId": "fc8c7fc06fda2375bd4fe5b58d5129e8",
    "faceUrl": "http://localhost:8081/static/face/fc8c7fc06fda2375bd4fe5b58d5129e8.jpg",
    "createTime": "2017-06-21 14:36:21"
  }
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "face.duplicate"
}
```

### 删除员工人脸照片
/face/delete

#####说明

	1､当删除员工最后一张照片的同时，会删除该员工
	
#####请求参数
	
	faceId // 人脸照片id
	
#####返回结果

```json
{
  "code": "success",
  "message": "success"
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "faceId.invalid"
}
```

### 员工人脸照片列表
/face/listByPerson

#####说明

	1､按照片添加时间正序排序
	
#####请求参数
	
	person // 员工名
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": [
    {
      "faceId": "4ee05462a743cfccb0b50db2808ad26d",
      "faceUrl": "http://172.16.0.138:8090/static/face/4ee05462a743cfccb0b50db2808ad26d.jpg",
      "createTime": "2017-06-21 11:13:05"
    },
    {
      "faceId": "382b2db83fa0b42d44e81902ab432afc",
      "faceUrl": "http://172.16.0.138:8090/static/face/382b2db83fa0b42d44e81902ab432afc.jpg",
      "createTime": "2017-06-21 11:44:32"
    }
  ]
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "person.invalid"
}
```

### 员工列表
/person/list

#####说明

	1､按员工名正序排序
	
#####请求参数
	
	无
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": [
    {
      "name": "abc"
    },
    {
      "name": "abcd"
    }
  ]
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "sessionId.invalid"
}
```
	
### 查询某天的出勤情况
/attendance/queryByDate

#####说明

	1､ 无论员工是否有出勤记录，都会在返回列表中
	2、上下班字段可能为空，具体分为 无考勤记录、只有上班记录、有上下班记录 三种情况，具体见返回结果示例
	
#####请求参数
	
	date // 日期，格式：yyyy-MM-dd，如：2017-06-21
	sortBy // 排序字段，以下选一："person", "attend_time", "leave_time", "record_count", "attend_minutes"
	sortOrder // 排序方向，二选一："asc", "desc"
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": [
    {
      "person": "无考勤记录的示例", // 员工名
      "attendTime": "", // 上班时间, 时间格式 HH:mm, 空: 未打卡
      "attendLocation": "", // 上班打卡地点, 空: 未打卡
      "attendHistoryFaceUrl": "", // 上班打卡人脸照片, 空: 未打卡
      "leaveTime": "", // 下班时间, 时间格式 HH:mm, 空: 未打卡
      "leaveLocation": "", // 下班打卡地点, 空: 未打卡
      "leaveHistoryFaceUrl": "", // 下班打卡人脸照片, 空: 未打卡
      "recordCount": 0, // 打卡次数，0: 没有打卡记录
      "attendMinutes": -1, // 出勤分钟数 未知
      "attendLateMinutes": -1, // 迟到分钟数, 0: 未迟到, -1: 未打卡
      "leaveEarlyMinutes": -1  // 早退分钟数, 0: 未早退, -1: 未打卡
    },
    {
      "person": "只有上班记录的示例",
      "attendTime": "08:50",
      "attendLocation": "gate2",
      "attendHistoryFaceUrl": "http://10.1.4.3:8090/static/history/2017-06-26/08cd1d4f-232c-4254-b486-7f449e5f9568.jpg",
      "leaveTime": "",
      "leaveLocation": "",
      "leaveHistoryFaceUrl": "",
      "recordCount": 1,
      "attendMinutes": -1, // 出勤分钟数 未知
      "attendLateMinutes": 0, // 未迟到
      "leaveEarlyMinutes": -1  // 未打卡
    },
    {
      "person": "有上下班记录的示例",
      "attendTime": "09:39",
      "attendLocation": "gate1",
      "attendHistoryFaceUrl": "http://10.1.4.3:8090/static/history/2017-06-26/08cd1d4f-232c-4254-b486-7f449e5f9568.jpg",
      "leaveTime": "17:19",
      "leaveLocation": "gate3",
      "leaveHistoryFaceUrl": "http://10.1.4.3:8090/static/history/2017-06-26/6dcd4906-5937-4c16-8a7d-dd9fc0bcb013.jpg",
      "recordCount": 5,
      "attendMinutes": 460, // 出勤分钟数
      "attendLateMinutes": 39, // 迟到分钟数
      "leaveEarlyMinutes": 41  // 早退分钟数
    }
  ]
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "sortBy.invalid"
}
```
	
### 查询某天的打卡记录
/history/query

#####说明

	1､ 只有识别出已知员工的打卡记录，才会在返回列表中
	
#####请求参数
	
	date // 日期，格式：yyyy-MM-dd，如：2017-06-21
	person // 可选，员工名
	location // 可选，打卡地点
	sortBy // 排序字段，以下选一："time", "person", "location"
	sortOrder // 排序方向，二选一："asc", "desc"
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": [
    {
      "time": "16:58:20",
      "person": "abc",
      "location": "gate3",
      "historyFaceUrl": "http://172.16.0.138:8090/static/history/2017-06-20/17cfa80d-d6da-4f3f-9752-dd6372887dc1.jpg"
    },
    {
      "time": "16:37:08",
      "person": "abcd",
      "location": "gate3",
      "historyFaceUrl": "http://172.16.0.138:8090/static/history/2017-06-20/17e08ea5-36f3-4adf-8073-272958a84764.jpg"
    },
    {
      "time": "15:25:33",
      "person": "abc",
      "location": "gate3",
      "historyFaceUrl": "http://172.16.0.138:8090/static/history/2017-06-20/7e2a7221-2a83-4528-a718-970ac383b536.jpg"
    }
  ]
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "date.invalid"
}
```

### 打卡地点列表
/location/list

#####说明

	1､ 按地点名正序排序
	
#####请求参数
	
	无
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": [
    {
      "name": "gate1"
    },
    {
      "name": "gate2"
    },
    {
      "name": "gate3"
    }
  ]
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "sessionId.invalid"
}
```

### 获得考勤规则
/console/getSetting

#####说明

    1､ 只有超级管理员才能访问
	2､ 时间格式：HH:mm:ss
	
#####请求参数
	
	无
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": {
    "latestAttendTime": "09:00:00",
    "earliestLeaveTime": "18:00:00"
  }
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "sessionId.invalid"
}
```

### 设置考勤规则
/console/updateSetting

#####说明

    1､ 只有超级管理员才能访问
	2､ 最晚上班时间不能晚于最早下班时间
	
#####请求参数
	
	latestAttendTime // 最晚上班时间，格式：HH:mm:ss
	earliestLeaveTime // 最早下班时间，格式：HH:mm:ss
	
#####返回结果

```json
{
  "code": "success",
  "message": "success"
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "latestAttendTime.shouldntLaterThan.earliestLeaveTime"
}
```

### 获得当前登录用户
/console/currentUser

#####说明

    1､ userType   0: 超级管理员   1: 普通管理员
	
#####请求参数
	
	无
	
#####返回结果

```json
{
  "code": "success",
  "message": "success",
  "result": {
    "loginName": "zhang3",
    "realName": "张三",
    "userType": 1  // 0: 超级管理员   1: 普通管理员
  }
}
```
	
#####出错示例
```json
{
  "code": "fail",
  "message": "sessionId.invalid"
}
```

### 导出某天的出勤情况
/attendance/exportByDate

#####说明

	1､ 该接口是文件下载接口，支持 HTTP Get 请求
	2、无论员工是否有出勤记录，都会在Excel中
	3、上下班字段可能为空，具体分为 无考勤记录、只有上班记录、有上下班记录 三种情况
	
#####请求参数
	
	lang // Excel语言，二选一："cn" 中文, "en" 英语
	date // 日期，格式：yyyy-MM-dd，如：2017-06-21
	sortBy // 排序字段，以下选一："person", "attend_time", "leave_time", "record_count", "attend_minutes"
	sortOrder // 排序方向，二选一："asc", "desc"
	
#####返回结果

    当日所有员工的出勤情况的Excel文件
	
#####出错示例
```json
{
  "code": "fail",
  "message": "lang.invalid"
}
```

## message对照表
<table>
  <tr>
    <th>名字</th>
    <th>说明</th>
  </tr>
    <tr>
    <th>success</th>
    <th>操作成功</th>
  </tr>    <tr>
    <th>serviceError</th>
    <th>服务器错误</th>
  </tr>    <tr>
    <th>noFace</th>
    <th>没有在照片中找到人脸</th>
  </tr>    <tr>
    <th>date.invalid</th>
    <th>日期格式不正确</th>
  </tr>    <tr>
    <th>sortBy.invalid</th>
    <th>排序字段不正确</th>
  </tr>    <tr>
    <th>sortOrder.invalid</th>
    <th>排序方向不正确</th>
  </tr>    <tr>
    <th>sort.invalid</th>
    <th>排序方式不正确</th>
  </tr>    <tr>
    <th>person.invalid</th>
    <th>姓名不正确</th>
  </tr>    <tr>
    <th>sessionId.invalid</th>
    <th>访问无效</th>
  </tr>    <tr>
    <th>sessionId.missing</th>
    <th>访问无效</th>
  </tr>    <tr>
    <th>password.invalid</th>
    <th>密码不正确</th>
  </tr>    <tr>
    <th>oldPassword.invalid</th>
    <th>原始密码不正确</th>
  </tr>    <tr>
    <th>loginName.invalid</th>
    <th>登录名不正确</th>
  </tr>    <tr>
    <th>loginName.duplicate</th>
    <th>登录名已存在</th>
  </tr>    <tr>
    <th>face.duplicate</th>
    <th>上传照片已存在</th>
  </tr>    <tr>
    <th>faceId.invalid</th>
    <th>faceId不正确</th>
  </tr>    <tr>
    <th>location.blank</th>
    <th>打卡地点不能为空</th>
  </tr>    <tr>
    <th>date.blank</th>
    <th>日期不能为空</th>
  </tr>    <tr>
    <th>sortBy.blank</th>
    <th>排序字段不能为空</th>
  </tr>    <tr>
    <th>sortOrder.blank</th>
    <th>排序方向不能为空</th>
  </tr>    <tr>
    <th>loginName.blank</th>
    <th>登录名不能为空</th>
  </tr>    <tr>
    <th>password.blank</th>
    <th>密码不能为空</th>
  </tr>    <tr>
    <th>oldPassword.blank</th>
    <th>原密码不能为空</th>
  </tr>    <tr>
    <th>newPassword.blank</th>
    <th>新密码不能为空</th>
  </tr>    <tr>
    <th>realName.blank</th>
    <th>真实姓名不能为空</th>
  </tr>    <tr>
    <th>person.blank</th>
    <th>姓名不能为空</th>
  </tr>    <tr>
    <th>faceId.blank</th>
    <th>faceId不能为空</th>
  </tr>    <tr>
    <th>request.invalid</th>
    <th>请求无效</th>
  </tr>    <tr>
    <th>imageUrl.cantDownload</th>
    <th>图片地址无效</th>
  </tr>    <tr>
    <th>request.tooBig</th>
    <th>请求过大</th>
  </tr>    <tr>
    <th>image.tooBig</th>
    <th>照片过大</th>
  </tr>    <tr>
    <th>imageParam.blank</th>
    <th>照片参数为空</th>
  </tr>    <tr>
    <th>imageFormat.invalid</th>
    <th>照片格式不正确</th>
  </tr>    <tr>
    <th>image.empty</th>
    <th>照片为空</th>
  </tr>    <tr>
    <th>latestAttendTime.blank</th>
    <th>最晚上班时间不能为空</th>
  </tr>    <tr>
    <th>latestAttendTime.invalid</th>
    <th>最晚上班时间格式不正确</th>
  </tr>    <tr>
    <th>earliestLeaveTime.blank</th>
    <th>最早下班时间不能为空</th>
  </tr>    <tr>
    <th>earliestLeaveTime.invalid</th>
    <th>最早下班时间格式不正确</th>
  </tr>    <tr>
    <th>latestAttendTime.shouldntLaterThan.earliestLeaveTime</th>
    <th>最晚上班时间不能晚于最早下班时间</th>
  </tr>    <tr>
    <th>lang.blank</th>
    <th>语言参数为空</th>
  </tr>    <tr>
    <th>lang.invalid</th>
    <th>语言参数不正确</th>
  </tr>
</table>
