interface Repository<E> {

    findAll(): Promise<E[]>

    findByPk(id: number): Promise<E | null>

    create(record: E): Promise<E | null>

    update(record: E): Promise<E | null>

    delete(id: number): Promise<Boolean>

}