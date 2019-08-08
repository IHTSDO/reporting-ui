import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Category } from '../../models/category';

@Component({
    selector: 'app-snomed-left-sidebar',
    templateUrl: './snomed-left-sidebar.component.html',
    styleUrls: ['./snomed-left-sidebar.component.scss']
})
export class SnomedLeftSidebarComponent implements OnInit {

    querySearch: string;
    activeCategory: Category;

    @Input() categories: Category[];
    @Output() categoryEmitter = new EventEmitter();
    @Output() searchTextEmitter = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.activeCategory = new Category();
    }

    updateText(): void {
        this.searchTextEmitter.emit(this.querySearch);
    }

    switchActiveCategory(category): void {
        if (this.activeCategory !== category) {
            this.activeCategory = category;
            this.categoryEmitter.emit(this.activeCategory);
        } else {
            this.activeCategory = null;
            this.categoryEmitter.emit(null);
        }
    }
}
