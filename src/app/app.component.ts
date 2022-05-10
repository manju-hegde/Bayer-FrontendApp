import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs/operators';
import {RickAndMortyService} from './RickAndMorty.service';
import {ICharacter} from './Models/Character.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend App';

  options = [];

  filteredOptions;
  listOfCharacters : ICharacter[];


  submittedvalue:string;
  formGroup : FormGroup;
  constructor(private service : RickAndMortyService, private fb : FormBuilder){
    this.submittedvalue = '';
    this.listOfCharacters= [];
  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'formCharacter' : ['']
    })
    this.formGroup.get('formCharacter').valueChanges
    .pipe(debounceTime(500))
    .subscribe(response => {
      if(response && response.length && response.length >=2 && this.submittedvalue != response){
        this.getSuggestions(response);
        this.listOfCharacters= [];
        this.filteredOptions = [];
      }
      else{
        this.filteredOptions = [];
      }
    })
  }
  getSuggestions(keyWord :string){
    this.service.getSuggestions(keyWord).subscribe(response => {
      this.filteredOptions = response;
    })
  }

  getCharacters(keyWord :string){
    this.service.getCharacter(keyWord).subscribe(response => {
      this.listOfCharacters = response;
    })
  }

  onEnter(event:any){
    event.target.blur();
    this.submittedvalue = this.formGroup.get('formCharacter').value;
    this.getCharacters(this.submittedvalue);
  }

  setOption(optionChangedEvent:any) {
    this.submittedvalue = optionChangedEvent.option.value;
    this.getCharacters(optionChangedEvent.option.value);
 }
}
