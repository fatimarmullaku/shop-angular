import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseStorageService} from "./base-storage.service";
import {ENDPOINTS} from "../constants/api.constants";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private httpClient:HttpClient,private localStorage: BaseStorageService) { }

    //second call
    buy():any{
    }

    //first call
    addToLineIteam():any{

    }

}
