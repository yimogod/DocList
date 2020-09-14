import { NzMessageService } from 'ng-zorro-antd';

export class UboxUtil {
  static HandleResponseStatus(msg: NzMessageService, status:string) {
    if (status == "401"){
        msg.info("上传文件失败, 可能是操作错误");
        return false;
      }

      if (status == "402"){
        msg.info("上传文件不合法");
        return false;
      }

      if (status == "403"){
        msg.info("上传文件可能不是excel");
        return false;
      }

      if (status == "501"){
        msg.info("服务器错误, 服务器在保存上传文件时出错");
        return false;
      }

      if (status == "504"){
        msg.info("服务器错误, 服务器在保存上传文件时出错, 导致无法读取excel进行分析");
        return false;
      }
    
      return true;
  }

}