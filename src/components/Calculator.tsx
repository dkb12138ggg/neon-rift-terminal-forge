
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const clearAll = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      case '=':
        return secondOperand;
      default:
        return 0;
    }
  };

  const CalculatorButton: React.FC<{ value: string, onClick: () => void, className?: string }> = 
    ({ value, onClick, className }) => (
    <Button
      variant="outline"
      className={cn(
        "flex-1 h-10 min-w-10 text-lg font-medium bg-white/5 hover:bg-white/10 border-white/10",
        className
      )}
      onClick={onClick}
    >
      {value}
    </Button>
  );

  return (
    <div className="w-full">
      <div className="rounded border border-white/10 bg-cyber-dark p-2 mb-2 text-right text-xl h-10 flex items-center justify-end overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1">
        <CalculatorButton value="C" onClick={clearAll} className="col-span-2 bg-neon-pink/10 hover:bg-neon-pink/20" />
        <CalculatorButton value="←" onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')} />
        <CalculatorButton value="/" onClick={() => performOperation('/')} className="bg-neon-blue/10 hover:bg-neon-blue/20" />
        
        <CalculatorButton value="7" onClick={() => inputDigit('7')} />
        <CalculatorButton value="8" onClick={() => inputDigit('8')} />
        <CalculatorButton value="9" onClick={() => inputDigit('9')} />
        <CalculatorButton value="*" onClick={() => performOperation('*')} className="bg-neon-blue/10 hover:bg-neon-blue/20" />
        
        <CalculatorButton value="4" onClick={() => inputDigit('4')} />
        <CalculatorButton value="5" onClick={() => inputDigit('5')} />
        <CalculatorButton value="6" onClick={() => inputDigit('6')} />
        <CalculatorButton value="-" onClick={() => performOperation('-')} className="bg-neon-blue/10 hover:bg-neon-blue/20" />
        
        <CalculatorButton value="1" onClick={() => inputDigit('1')} />
        <CalculatorButton value="2" onClick={() => inputDigit('2')} />
        <CalculatorButton value="3" onClick={() => inputDigit('3')} />
        <CalculatorButton value="+" onClick={() => performOperation('+')} className="bg-neon-blue/10 hover:bg-neon-blue/20" />
        
        <CalculatorButton value="0" onClick={() => inputDigit('0')} className="col-span-2" />
        <CalculatorButton value="." onClick={inputDecimal} />
        <CalculatorButton value="=" onClick={() => performOperation('=')} className="bg-neon-blue/20 hover:bg-neon-blue/30" />
      </div>
    </div>
  );
};

export default Calculator;
