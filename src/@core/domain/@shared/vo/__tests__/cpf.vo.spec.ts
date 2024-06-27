import DomainException from "../../exceptions/domain.exception";
import CPFVO from "../cpf.vo";

describe('CPFVO', () => {
    it('should create a valid CPFVO instance', () => {
        const cpf = '12345678909';
        const cpfVO = new CPFVO(cpf);
        expect(cpfVO.unformat()).toBe(cpf);
    });

    it('should throw an error for an invalid CPF', () => {
        const cpf = '12345678900';
        expect(() => new CPFVO(cpf)).toThrow(DomainException);
    });

    it('should format the CPF', () => {
        const cpf = '12345678909';
        const cpfVO = new CPFVO(cpf);
        expect(cpfVO.format()).toBe('123.456.789-09');
    });

    it('should unformat the CPF', () => {
        const cpf = '123.456.789-09';
        const cpfVO = new CPFVO(cpf);
        expect(cpfVO.unformat()).toBe('12345678909');
    });

    it('should convert the CPF to string', () => {
        const cpf = '12345678909';
        const cpfVO = new CPFVO(cpf);
        expect(cpfVO.toString()).toBe(cpf);
    });

    it('should throw a DomainException when validating an invalid CPF', () => {
        const cpf = '12345678900';
        expect(() => new CPFVO(cpf)).toThrow(DomainException);
    });

    it('should not throw any error when validating a valid CPF', () => {
        const cpf = '12345678909';
        const cpfVO = new CPFVO(cpf);
        expect(() => cpfVO.validate()).not.toThrow();
    });
});